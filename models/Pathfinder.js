const dbService = require('../services/DB.js');

module.exports = class Pathfinder{
  static removeSubstring(incString){
    if(typeof incString === 'string'){
      if(incString.includes('(ARG)')){
        return incString.substring(0, incString.length-6);
      } else if(incString.includes('(CRB)')){
        return incString.substring(0, incString.length-6);
      } else if(incString.includes('(OA)')){
        return incString.substring(0, incString.length-5);
      } else if(incString.includes('(U)')){
        return incString.substring(0, incString.length-4);
      }  else if(incString.includes('(ACG)')){
        return incString.substring(0, incString.length-6);
      }  else if(incString.includes('(Eberron)')){
        return incString.substring(0, incString.length-10);
      }  else if(incString.includes('(APG)')){
        return incString.substring(0, incString.length-6);
      }  else if(incString.includes('(Ultimate Intrigue)')){
        return incString.substring(0, incString.length-20);
      }  else if(incString.includes('(UC)')){
        return incString.substring(0, incString.length-5);
      } else if(incString.includes('(SoP, DDS)')){
        return incString.substring(0, incString.length-11);
      } else if(incString.includes('Unchained')){
        return incString.substring(0, incString.length-10);
      } else if(incString.includes('(PoW, DSP)')){
        return incString.substring(0, incString.length-11);
      } else if(incString.includes('(PoWE, DSP)')){
        return incString.substring(0, incString.length-12);
      } else if(incString.includes(' Race (DSP) - Please Specify')){
        return incString.substring(0, incString.length-28);
      } else if(incString.substring('(DSP)')){
        return incString.substring(0, incString.length-6);
      } else if(incString.includes('Dark Sun')){
        return incString.substring(0, incString.length-10);
      } else {
        return incString;
      }
    } else {
      console.log('Not a string')
    }
  }
  static async getRaces(){
    const pathChars = await dbService.db.collection('pathfinder').find().toArray();
    //console.log('These are the characters' + pathChars);
    let racesCount = [];
    let humanCount = 0, elfCount = 0, gnomeCount = 0, halfOrcCount = 0, tieflingCount = 0, halflingCount = 0, halfElfCount = 0, dwarfCount = 0, otherCount = 0, aasimarCount = 0;
    for (let pathName in pathChars){
      if(Pathfinder.removeSubstring(pathChars[pathName].race).length > 0){
        if(Pathfinder.removeSubstring(pathChars[pathName].race) == 'Human'){
          humanCount +=1
        } else if(Pathfinder.removeSubstring(pathChars[pathName].race) == 'Elf'){
          elfCount += 1;
        } else if(Pathfinder.removeSubstring(pathChars[pathName].race) == 'Gnome'){
          gnomeCount += 1;
        } else if(Pathfinder.removeSubstring(pathChars[pathName].race) == 'Half-Orc'){
          halfOrcCount += 1;
        } else if(Pathfinder.removeSubstring(pathChars[pathName].race) == 'Tiefling'){
          tieflingCount += 1;
        } else if(Pathfinder.removeSubstring(pathChars[pathName].race) == 'Halfling'){
          halflingCount += 1;
        } else if(Pathfinder.removeSubstring(pathChars[pathName].race) == 'Half-Elf'){
          halfElfCount += 1;
        } else if(Pathfinder.removeSubstring(pathChars[pathName].race) == 'Dwarf'){
          dwarfCount += 1;
        } else if(Pathfinder.removeSubstring(pathChars[pathName].race) == 'Aasimar'){
          aasimarCount += 1;
        } else {
          //console.log(pathChars[pathName].race);
          otherCount += 1;
        }
      }
    }
    // Ratfolk, Changeling, Orc, Vampire, Drow
    racesCount.push(humanCount, elfCount, gnomeCount, halfOrcCount, tieflingCount, halflingCount, halfElfCount, dwarfCount, otherCount, aasimarCount);
    return racesCount;

  }
  static async getOtherRaces(){
    const pathChars = await dbService.db.collection('pathfinder').find().toArray();
    let otherRaces = [];
    let ratfolk = 0, akashic = 0, goblin = 0, changeling = 0, drow = 0, orc = 0, vampire = 0, specifiedOther = 0, other = 0;
    for(let pathName in pathChars){
      if(Pathfinder.removeSubstring(pathChars[pathName].race).length>0){
      //console.log(Pathfinder.removeSubstring(pathChars[pathName].race));
      //console.log(Pathfinder.removeSubstring(pathChars[pathName].race).length);
      if(Pathfinder.removeSubstring(pathChars[pathName].race) !== 'Human' | Pathfinder.removeSubstring(pathChars[pathName].race) !== 'Elf'
        | Pathfinder.removeSubstring(pathChars[pathName].race) !== 'Gnome' | Pathfinder.removeSubstring(pathChars[pathName].race) !== 'Half-Orc'
        | Pathfinder.removeSubstring(pathChars[pathName].race) !== 'Halfling' | Pathfinder.removeSubstring(pathChars[pathName].race) !== 'Tiefling'
        | Pathfinder.removeSubstring(pathChars[pathName].race) !== 'Half-Elf' | Pathfinder.removeSubstring(pathChars[pathName].race) !== 'Dwarf'
        | Pathfinder.removeSubstring(pathChars[pathName].race) !== 'Aasimar'){
          if(Pathfinder.removeSubstring(pathChars[pathName].race) == 'Ratfolk'){
            ratfolk += 1;
          } else if(Pathfinder.removeSubstring(pathChars[pathName].race) == 'Akashic'){
            akashic += 1;
          } else if(Pathfinder.removeSubstring(pathChars[pathName].race) == 'Goblin'){
            goblin += 1;
          } else if(Pathfinder.removeSubstring(pathChars[pathName].race) == 'Changeling'){
            changeling += 1;
          } else if(Pathfinder.removeSubstring(pathChars[pathName].race) == 'Drow'){
            drow += 1;
          } else if(Pathfinder.removeSubstring(pathChars[pathName].race) == 'Orc'){
            orc += 1; 
          } else if(Pathfinder.removeSubstring(pathChars[pathName].race) == 'Vampire'){
            vampire += 1;
          } /*else if(Pathfinder.removeSubstring(pathChars[pathName].race) == '3rd Party / Homebrew / Forgot / Other' | Pathfinder.removeSubstring(pathChars[pathName].race) == '3rd Party / Homebrew / Forgot /'){
            specifiedOther += 1;
          } else {
            other += 1;
          }*/
        }
      }
    }
    otherRaces.push(ratfolk, akashic, goblin, changeling, drow, orc, vampire);
    return otherRaces;
  }
  static async getClasses(){
    const pathChars = await dbService.db.collection('pathfinder').find().toArray();
    //Druid, Bard, Wizard, Sorcerer, Barbarian, Witch, Cleric, Fighter, Rogue, Magus, Inquisitor, Warpriest, Gunslinger, Paladin, Alchemist, Swashbuckler, Ranger
    let druid = 0, bard = 0, wizard = 0, sorcerer = 0, barbarian = 0, witch = 0, cleric = 0, fighter = 0, rogue = 0, magus = 0, inquisitor = 0, 
    warpriest = 0, gunslinger = 0, paladin = 0, alchemist = 0, swashbuckler = 0, ranger = 0, other = 0, oracle = 0, hunter = 0, shaman = 0, cavalier = 0, 
    monk = 0, other2 = 0; 
    let classes = [];
    for(let pathName in pathChars){
      if(pathChars[pathName].class.length > 0){
        //console.log(pathChars[pathName].class);
        if(Pathfinder.removeSubstring(pathChars[pathName].class) === 'Druid'){
          druid += 1;
        } else if(Pathfinder.removeSubstring(pathChars[pathName].class) === 'Bard'){
          bard += 1;
        }else if(Pathfinder.removeSubstring(pathChars[pathName].class) === 'Wizard'){
          wizard += 1;
        }else if(Pathfinder.removeSubstring(pathChars[pathName].class) === 'Sorcerer'){
          sorcerer += 1;
        }else if(Pathfinder.removeSubstring(pathChars[pathName].class) === 'Barbarian'){
          barbarian += 1;
        }else if(Pathfinder.removeSubstring(pathChars[pathName].class) === 'Witch'){
          witch += 1;
        }else if(Pathfinder.removeSubstring(pathChars[pathName].class) === 'Cleric'){
          cleric += 1;
        }else if(Pathfinder.removeSubstring(pathChars[pathName].class) === 'Fighter'){
          fighter += 1;
        }else if(Pathfinder.removeSubstring(pathChars[pathName].class) === 'Rogue' | Pathfinder.removeSubstring(pathChars[pathName].class) === 'Rogue Unchained'){
          rogue += 1;
        }else if(Pathfinder.removeSubstring(pathChars[pathName].class) === 'Magus'){
          magus += 1;
        }else if(Pathfinder.removeSubstring(pathChars[pathName].class) === 'Inquisitor'){
          inquisitor += 1;
        }else if(Pathfinder.removeSubstring(pathChars[pathName].class) === 'Warpriest'){
          warpriest += 1;
        }else if(Pathfinder.removeSubstring(pathChars[pathName].class) === 'Gunslinger'){
          gunslinger += 1;
        }else if(Pathfinder.removeSubstring(pathChars[pathName].class) === 'Paladin'){
          paladin += 1;
        }else if(Pathfinder.removeSubstring(pathChars[pathName].class) === 'Alchemist'){
          alchemist += 1;
        }else if(Pathfinder.removeSubstring(pathChars[pathName].class) === 'Swashbuckler'){
          swashbuckler += 1;
        }else if(Pathfinder.removeSubstring(pathChars[pathName].class) === 'Ranger'){
          ranger += 1;
        } else if(Pathfinder.removeSubstring(pathChars[pathName].class) === 'Monk' | Pathfinder.removeSubstring(pathChars[pathName].class)==='Monk Unchained'){
          monk += 1;
        } else if(Pathfinder.removeSubstring(pathChars[pathName].class) === 'Oracle'){
          oracle += 1;
        } else if(Pathfinder.removeSubstring(pathChars[pathName].class) === 'Hunter'){
          hunter += 1;
        } else if(Pathfinder.removeSubstring(pathChars[pathName].class) === 'Shaman'){
          shaman += 1;
        } else if(Pathfinder.removeSubstring(pathChars[pathName].class) === 'Cavalier'){
          cavalier += 1;
        } else if(Pathfinder.removeSubstring(pathChars[pathName].class) === '3rd Party / Homebrew / Other' | Pathfinder.removeSubstring(pathChars[pathName].class) === '3rd Party / Homebrew /'){
          other2 += 1;
        } else {
          other += 1;
        }
      }
    }
    classes.push(druid, bard, wizard, sorcerer, barbarian, witch, cleric, fighter, rogue, magus, inquisitor, warpriest, gunslinger, paladin, alchemist, swashbuckler, ranger, monk, oracle, hunter, shaman, cavalier, other2, other);
    return classes;
  }
}