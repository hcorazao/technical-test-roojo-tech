import { Component, OnInit, ElementRef } from '@angular/core';
import { UploadService } from '../upload/upload.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-view-tree',
  templateUrl: './view-tree.component.html',
  styleUrls: ['./view-tree.component.scss']
})
export class ViewTreeComponent implements OnInit {

  constructor(
  	private elementRef: ElementRef,
    private router: Router,
  	public uploadService: UploadService) { }
  familiesList: [] = [];
  parsedGedcom: any;
  familyHerarchy: any;
  treeHtml: string;

  ngOnInit() {
  	this.uploadService.currentMessage.subscribe(data => this.parsedGedcom = data);
    if (!!this.parsedGedcom) {
      this.parseGedcom(this.parsedGedcom);
    } else {
      this.router.navigate(['/gedcom-converter/upload']);
    }
  }

  parseGedcom(records) {
    const userList = records.filter(record => record.tag === 'INDI');
    const familiyRelation = records.filter(record => record.tag === 'FAM');
    this.familiesList = familiyRelation.map(family => {
      let marriageData;
      let members = family.tree.map(member => {
        // MARR is an attribute that indicates marriage data
        if (member.tag !== 'MARR') {
          let dataList = userList.find(user => user.pointer === member.data);
          let parsedUserData = dataList.tree.map(userData => { 
            let finalUserData;
            if (userData.tree.length > 0 && userData.tag !== 'NAME') { //TODO here, there are emtpy names
              let detailData = userData.tree.map(data => ({
                tag: data.tag,
                data: data.data
              }));
              finalUserData = {
                tag: userData.tag,
                detailData: detailData
              };
            } else {
              finalUserData = {
                tag: userData.tag,
                data: userData.data
              };
            }
            return finalUserData;
          });
          let birthDate = '';
          let deathDate = '';
          let familyChild = '';
          if (!!parsedUserData.find(data => data.tag === 'BIRT')) {
            let rawDateObject = parsedUserData.find(data => data.tag === 'BIRT').detailData.find(detail => detail.tag === 'DATE');
            if (!!rawDateObject) {
              birthDate = rawDateObject.data;
            }
          }
          if (!!parsedUserData.find(data => data.tag === 'DEAT')) {
            let rawDateObject = parsedUserData.find(data => data.tag === 'DEAT').detailData.find(detail => detail.tag === 'DATE');
            if (!!rawDateObject) {
              deathDate = rawDateObject.data;
            }
          }
          if (!!parsedUserData.find(data => data.tag === 'FAMC')) {
            let rawDateObject = parsedUserData.find(data => data.tag === 'FAMC');
            if (!!rawDateObject) {
              familyChild = rawDateObject.data;
            }
          }
          return {
            familyChild: familyChild,
            name: parsedUserData.find(data => data.tag === 'NAME').data,
            relationShip: member.tag,
            id : member.data,
            rawData: parsedUserData,
            birthDate: birthDate,
            deathDate: deathDate
          }
        } else {  
          marriageData = member.tree.map(attribute => ({
            tag: attribute.tag,
            data: attribute.data
          }));
          return null;
        }
      });
      return {
        id: family.pointer,
        members: members,
        marriageData: marriageData
      };
    });
    this.buildFamilyHerarchy(this.familiesList);
  }

  buildFamilyHerarchy(familyList) {
    familyList = this.getFirstLevelFamily(familyList);
    let currentLevelFamilies = familyList.filter(family => family.index === 0);
    let newFamilyList = [];
    currentLevelFamilies.forEach((family) => {
      let parsedFamily = this.iterateMembersFamily(family);
      newFamilyList.push(parsedFamily);
    });
    this.familyHerarchy = newFamilyList;
    this.buildHtml();
  }

  iterateMembersFamily(family) {
    let newFamily = family;
    let familyMembers = [];
    for (var i = 0; i < family.members.length; ++i) {
      let newMember = family.members[i];
      let childFamily = this.getFamily(family.id, family.members[i]);
      if(!!childFamily) {
        newMember.childFamily = this.iterateMembersFamily(childFamily);
      }
      familyMembers.push(newMember);
    }
    newFamily.members = familyMembers;
    return newFamily;
  }

  getFamily(familyId, familyMember) {
    let family
    if (!!familyMember) {
      family = this.findIfMemberHasChilds(familyId, familyMember); // this should return the family
    }
    return family; family;
  }

  findIfMemberHasChilds(familyId, member) {
    const completeFamilyList: any = this.familiesList;
    let newFamily: any = {};
    let childs = [];
    newFamily = {
      id: '',
      members: []
    };
    for (var i = 0; i < completeFamilyList.length; ++i) {
      for (var j = 0; j < completeFamilyList[i].members.length; ++j) {
        if (!!completeFamilyList[i].members[j] &&
          completeFamilyList[i].members[j].familyChild === familyId &&
          completeFamilyList[i].members[j].relationShip !== 'CHIL' &&
          completeFamilyList[i].members[j].id === member.id) {
          newFamily = this.searchFamilyByPerson(completeFamilyList[i].members[j].id);
          break;
        }
      }
    }
    if (!newFamily.id) {
      newFamily = null;
    }
    return newFamily;
  }

  searchFamilyByPerson(personId) {
    const familyListSearch: any = this.familiesList;
    let personFatherOfFamily: any = {};
    let newFamily = {};
    for (var i = 0; i < familyListSearch.length; ++i) {
      for (var j = 0; j < familyListSearch[i].members.length; ++j) {
        if (!!familyListSearch[i].members[j] && 
          familyListSearch[i].members[j].id === personId && 
          familyListSearch[i].members[j].relationShip !== 'CHIL') {
          personFatherOfFamily = familyListSearch[i].members[j];
          break;
        }
      }
    }
    for (var i = 0; i < familyListSearch.length; ++i) {
      for (var j = 0; j < familyListSearch[i].members.length; ++j) {
        if (!!familyListSearch[i].members[j] && 
          familyListSearch[i].members[j].id === personFatherOfFamily.id &&
          familyListSearch[i].members[j].relationShip!='CHIL') {
          newFamily = familyListSearch.find(family => family.id === familyListSearch[i].id);
          break;
        }
      }
    }
    return newFamily;
  }

  getFirstLevelFamily(familyList) {
    for (let i = 0; i < familyList.length; ++i) {
      let familyCode = familyList[i].id;
      let marriageHerarcyState = {
        husbandFirstFamily: false,
        wifeFirstFamily: false
      };
      for (let j = 0; j < familyList[i].members.length; ++j) {
        if (!!familyList[i].members[j]) {
          if (familyList[i].members[j].relationShip === 'HUSB') {
            if (familyList[i].members[j].familyChild === '') {
              marriageHerarcyState.husbandFirstFamily = true;
            }
          }
          if (familyList[i].members[j].relationShip === 'WIFE') {
            if (familyList[i].members[j].familyChild === '') {
              marriageHerarcyState.wifeFirstFamily = true;
            }
          }
        } 
      }
      if (!!marriageHerarcyState.husbandFirstFamily && !!marriageHerarcyState.wifeFirstFamily) {
        familyList[i].index = 0;
      }
    }
    return familyList;
  }

  searchPerson(personId) {
    const familyListSearch: any = this.familiesList;
    let personFatherOfFamily = {};
    for (var i = 0; i < familyListSearch.length; ++i) {
      for (var j = 0; j < familyListSearch[i].members.length; ++j) {
        if (!!familyListSearch[i].members[j] && 
          familyListSearch[i].members[j].id === personId) {
          personFatherOfFamily = familyListSearch[i].members[j];
          break;
        }
      }
    }
    return personFatherOfFamily;
  }

  removeDups(array) {
    let unique = {};
    array.forEach(function(i) {
      if(!unique[i]) {
        unique[i] = true;
      }
    });
    return Object.keys(unique);
  }

  buildHtml() {
    console.log("family herarchy", this.familyHerarchy);
    let html = '';
    this.familyHerarchy.forEach((family) => {
      html = html + this.buildFirstLevelFamilyHtml(family);
    });
    this.treeHtml = html;
    const container = this.elementRef.nativeElement.querySelector('#wrapper');
    container.insertAdjacentHTML('beforeend', html);
  }

  buildFamilyHtml(family, parentMemberId) {
    let html = '';
    if(!!family) {
      family.members.forEach((member)=> {
        if (!!member) {
          if (member.id !== parentMemberId) {
            if(!!member.childFamily) {
              var childFamilyHtml = this.buildFamilyHtml(member.childFamily, member.id);
              html = html + '<div class="entry">'+
                              '<div class="label">'+
                                '<div class="name">'+
                                  member.name +
                                '</div>'+
                                '<div class="date">'+
                                  member.birthDate + '-' + member.deathDate +
                                '</div>'+
                              '</div>'+
                              '<div class="branch">'+
                                childFamilyHtml +
                              '</div>'+
                            '</div>'
            } else {
              html = html + '<div class="entry">'+
                              '<div class="label">'+
                                '<div class="name">'+
                                  member.name +
                                '</div>'+
                                '<div class="date">'+
                                  member.birthDate + '-' + member.deathDate +
                                '</div>'+
                              '</div>'+
                            '</div>';
            }
          } 
        }
      });
    }
    return html;
  }

  buildFirstLevelFamilyHtml(family) {
    let html = '<div class="family">';
    let familyCreated = false;
    family.members.forEach((member)=> {
      if (!!member) {
        if (member.relationShip==='WIFE' || member.relationShip==='HUSB') {
          let childFamilyHtml = '';
          if (!familyCreated) {
            childFamilyHtml = this.buildFirstFamilyChildsHtml(family);
            familyCreated = true;
          }
          html = html + '<div class="new-family">' +
                          '<div class="root label first-route">' +
                            '<div class="name">' +
                              member.name +
                            '</div>' +
                            '<div class="date">' +
                              member.birthDate + '-' + member.deathDate +
                            '</div>' +
                            '<div class="branch">'+
                              childFamilyHtml +
                            '</div>' +
                          '</div>'+
                        '</div>';
        }
      }
    });
    html = html + '</div>';
    return html;
  }

  buildFirstFamilyChildsHtml(family) {
    let html = '';
    family.members.forEach((member)=> {
      if (!!member) {
        if (member.relationShip==='CHIL') {
          if(!!member.childFamily) {
            let childFamilyHtml = this.buildFamilyHtml(member.childFamily, member.id);
            html = html + '<div class="entry">'+
                            '<div class="label">'+
                              '<div class="name">'+
                                member.name +
                              '</div>'+
                              '<div class="date">'+
                                member.birthDate + '-' + member.deathDate +
                              '</div>'+
                            '</div>'+
                            '<div class="branch">'+
                              childFamilyHtml +
                            '</div>'+
                          '</div>';
          } else {
            html = html + '<div class="entry">'+
                            '<div class="label">'+
                              '<div class="name">'+
                                member.name +
                              '</div>'+
                              '<div class="date">'+
                                member.birthDate + '-' + member.deathDate +
                              '</div>'+
                            '</div>'+
                          '</div>';
          }
        }
      }
    });
    return html;
  }

}
