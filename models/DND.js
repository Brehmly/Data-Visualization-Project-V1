//const dndChars = require('../data/dnd_chars_all');
const dbService = require('../services/DB');

module.exports = class DND{
    static async fillMongo(){
      let mongoArray = [];
      let pClass = '';
      let subClass = '';
      let race = '';
      let alignment = '';
      let background = '';
      let level = '';
      let skills = '';
      let attributes = {};

      for(let attributeName in dndChars){
        for(let playerClass in dndChars[attributeName].class){
          pClass = dndChars[attributeName].class;
          //if(dndChars[attributeName].class[playerClass].subClass[0]){
          //  subClass = dndChars[attributeName].class[playerClass].subClass;
          //}
        }
        race = dndChars[attributeName].race;
        if(dndChars[attributeName].alignment.length> 0){
          alignment = dndChars[attributeName].alignment;
        }
        background = dndChars[attributeName].background[0];
        level = dndChars[attributeName].level[0];
        skills = dndChars[attributeName].skills;
        attributes = {strength: dndChars[attributeName].attributes.Str[0], dexterity: dndChars[attributeName].attributes.Dex[0], 
          constituion: dndChars[attributeName].attributes.Con[0], intelligence: dndChars[attributeName].attributes.Int[0], 
          wisdom: dndChars[attributeName].attributes.Wis[0], charisma: dndChars[attributeName].attributes.Cha[0]};
        mongoArray.push({race: race, alignment: alignment, background: background, 
        class: pClass, level: level, skill: skills, attributes: attributes});
        await dbService.db.collection('dnd').insertOne({race: race, alignment: alignment, background: background, 
          class: pClass, level: level, skill: skills, attributes: attributes});
    }
    console.log(mongoArray);

      //let insertedArray = await dbService.db.collection('dnd').insertMany(mongoArray);
      return mongoArray;
    }

    static async countRaces(){
      const dndChars = await dbService.db.collection('dnd').find().toArray();
      let racesCount = [];
      let humanCount = 0, elfCount = 0, gnomeCount = 0, halfOrcCount = 0, tieflingCount = 0, halflingCount = 0, halfElfCount = 0, dwarfCount = 0, otherCount = 0, aasimarCount = 0, dragonbornCount = 0, aarakocraCount = 0;
      for(let attributeName in dndChars){
        //console.log(dndChars[attributeName].race)
        if(dndChars[attributeName].race.length>0){
          if(dndChars[attributeName].race == 'Human'){
            humanCount +=1
          } else if(dndChars[attributeName].race == 'Elf'){
            elfCount += 1;
          } else if(dndChars[attributeName].race == 'Gnome'){
            gnomeCount += 1;
          } else if(dndChars[attributeName].race == 'Half-Orc'){
            halfOrcCount += 1;
          } else if(dndChars[attributeName].race == 'Tiefling'){
            tieflingCount += 1;
          } else if(dndChars[attributeName].race == 'Halfling'){
            halflingCount += 1;
          } else if(dndChars[attributeName].race == 'Half-Elf'){
            halfElfCount += 1;
          } else if(dndChars[attributeName].race == 'Dwarf'){
            dwarfCount += 1;
          } else if(dndChars[attributeName].race == 'Aasimar'){
            aasimarCount += 1;
          } else if(dndChars[attributeName].race == 'Dragonborn'){
            dragonbornCount += 1;
          } else if(dndChars[attributeName].race == 'Aarakocra'){
            aarakocraCount += 1;
          } else {
            otherCount += 1;
          }
        }
      }
      racesCount.push(humanCount, elfCount, gnomeCount, halfOrcCount, tieflingCount, halflingCount, halfElfCount, dwarfCount, otherCount, aasimarCount, dragonbornCount, aarakocraCount);
      return racesCount;
    }
    static async countClasses(){
      const dndChars = await dbService.db.collection('dnd').find().toArray();
      let classesCount = [];
      let artificer = 0, barbarian = 0, bard = 0, cleric = 0, druid = 0, fighter = 0, monk = 0, paladin = 0, ranger = 0, runescribe = 0, rogue = 0, warlock = 0, wizard = 0, other = 0;
      for(let attributeName in dndChars){
        for(let playerClass in dndChars[attributeName].class){
          if(dndChars[attributeName].class.length > 0){
            //console.log(dndChars[attributeName].class)
            if(dndChars[attributeName].class === 'Artificer'){
              artificer += 1
            } else if(dndChars[attributeName].class === 'Barbarian'){
              barbarian += 1
            } else if(dndChars[attributeName].class === 'Bard'){
              bard += 1
            } else if(dndChars[attributeName].class === 'Cleric'){
              cleric += 1
            } else if(dndChars[attributeName].class === 'Druid'){
              druid += 1
            } else if(dndChars[attributeName].class === 'Fighter'){
              fighter += 1
            } else if(dndChars[attributeName].class === 'Monk'){
              monk += 1
            } else if(dndChars[attributeName].class === 'Paladin'){
              paladin += 1
              //Ranger got buffed because it was really weak on release, called Revised Ranger, counting towards the same because same class
            } else if(dndChars[attributeName].class === 'Ranger' | dndChars[attributeName].class === 'Revised Ranger'){
              ranger += 1
            } else if(dndChars[attributeName].class === 'Blood Hunter'){
              runescribe += 1
            } else if(dndChars[attributeName].class === 'Rogue'){
              rogue += 1
            } else if(dndChars[attributeName].class === 'Warlock'){
              warlock += 1
            } else if(dndChars[attributeName].class === 'Wizard'){
              wizard += 1
            } else {
              other += 1
            }
          }
        }
      }
      classesCount.push(artificer, barbarian, bard, cleric, druid, fighter, monk, paladin, ranger, runescribe, rogue, warlock, wizard, other);
      return classesCount;
    }
    static async countRanger(){
      const dndChars = await dbService.db.collection('dnd').find().toArray();
      let rangerCount = [];
      let ranger = 0, revisedRanger = 0;
      for(let attributeName in dndChars){
        for(let playerClass in dndChars[attributeName].class){
          if(dndChars[attributeName].class.length > 0){
            if(dndChars[attributeName].class=== 'Ranger'){
              ranger += 1;
            } else if(dndChars[attributeName].class=== 'Revised Ranger'){
              revisedRanger +=1
            }
          }
        }
      }
      rangerCount.push(ranger, revisedRanger);
      return rangerCount;
    }
    static async countAlignment(){
      const dndChars = await dbService.db.collection('dnd').find().toArray();
      let lgCount = 0, lnCount = 0, leCount = 0, ngCount = 0, nCount = 0, neCount = 0, cgCount = 0, cnCount = 0, ceCount = 0;
      let alignments = [];
      for(let attributeName in dndChars){
        if(dndChars[attributeName].alignment){
          if(dndChars[attributeName].alignment.toLowerCase() === 'lawful good' | dndChars[attributeName].alignment.toLowerCase() === 'lg'){
            lgCount += 1;
          } else if(dndChars[attributeName].alignment.toLowerCase() === 'lawful neutral' | dndChars[attributeName].alignment.toLowerCase() === 'ln'){
            lnCount += 1;
          } else if(dndChars[attributeName].alignment.toLowerCase() === 'lawful evil' | dndChars[attributeName].alignment.toLowerCase() === 'le'){
            leCount += 1;
          } else if(dndChars[attributeName].alignment.toLowerCase() === 'neutral good' | dndChars[attributeName].alignment.toLowerCase() === 'ng'){
            ngCount += 1;
          } else if(dndChars[attributeName].alignment.toLowerCase() === 'neutral' | dndChars[attributeName].alignment.toLowerCase() === 'n'){
            nCount += 1;
          } else if(dndChars[attributeName].alignment.toLowerCase() === 'neutral evil' | dndChars[attributeName].alignment.toLowerCase() === 'ne'){
            neCount += 1;
          } else if(dndChars[attributeName].alignment.toLowerCase() === 'chaotic good' | dndChars[attributeName].alignment.toLowerCase() === 'cg'){
            cgCount += 1;
          } else if(dndChars[attributeName].alignment.toLowerCase() === 'chaotic neutral' | dndChars[attributeName].alignment.toLowerCase() === 'cn'){
            cnCount += 1;
          } else if(dndChars[attributeName].alignment.toLowerCase() === 'chaotic evil' | dndChars[attributeName].alignment.toLowerCase() === 'ce'){
            ceCount += 1;
          }
        }
      }
      alignments.push(lgCount, lnCount, leCount, ngCount, nCount, neCount, cgCount, cnCount, ceCount);
      return alignments;
    }

    static async countBackground(){
      const dndChars = await dbService.db.collection('dnd').find().toArray();
      let other = 0, noble = 0, charlatan = 0, hermit = 0, urchin = 0, soldier = 0, criminal = 0, acolyte = 0, knight = 0, farTraveler = 0,
      sailor = 0, outlander = 0, factionAgent = 0, sage = 0, ubh = 0, entertainer = 0, folkHero = 0, hauntedOne = 0, mercenaryVeteran = 0, 
      barbarianTribeMember = 0, guildArtisan = 0, cloisteredScholar = 0, clanCrafter = 0, cityWatch = 0, courtier = 0,
      guildMember = 0;
      let backgroundsCount = [];
      for(let attributeName in dndChars){
        if(dndChars[attributeName].background[0]){
          if(dndChars[attributeName].background[0] !== 'Custom'){
            if(dndChars[attributeName].background[0] === 'Noble'){
              noble += 1;
            } else if(dndChars[attributeName].background[0] === 'Charlatan'){
              charlatan += 1;
            } else if(dndChars[attributeName].background[0] === 'Hermit'){
              hermit += 1;
            } else if(dndChars[attributeName].background[0] === 'Urchin'){
              urchin += 1;
            } else if(dndChars[attributeName].background[0] === 'Soldier'){
              soldier += 1;
            } else if(dndChars[attributeName].background[0] === 'Criminal'){
              criminal += 1;
            } else if(dndChars[attributeName].background[0] === 'Acolyte'){
              acolyte += 1;
            } else if(dndChars[attributeName].background[0] === 'Knight'){
              knight+=1;
            } else if(dndChars[attributeName].background[0] === 'Far Traveler'){
              farTraveler+=1;
            } else if(dndChars[attributeName].background[0] === 'Sailor'){
              sailor +=1;
            } else if(dndChars[attributeName].background[0] === 'Outlander'){
              outlander+=1;
            } else if(dndChars[attributeName].background[0] === 'Faction Agent'){
              factionAgent+=1;
            } else if(dndChars[attributeName].background[0] === 'Sage'){
              sage+=1;
            } else if(dndChars[attributeName].background[0] === 'Urban Bounty Hunter'){
              ubh +=1;
            } else if(dndChars[attributeName].background[0] === 'Entertainer'){
              entertainer+=1;
            } else if(dndChars[attributeName].background[0] === 'Folk Hero'){
              folkHero+=1;
            } else if(dndChars[attributeName].background[0] === 'Haunted One'){
              hauntedOne+=1;
            } else if(dndChars[attributeName].background[0] === 'Mercenary Veteran'){
              mercenaryVeteran+=1;
            } else if(dndChars[attributeName].background[0] === 'Barbarian Tribe Member'){
              barbarianTribeMember+=1;
            } else if(dndChars[attributeName].background[0] === 'Guild Artisan'){
              guildArtisan+=1;
            } else if(dndChars[attributeName].background[0] === 'Cloistered Scholar'){
              cloisteredScholar+=1;
            } else if(dndChars[attributeName].background[0] === 'Clan Crafter'){
              clanCrafter+=1;
            } else if(dndChars[attributeName].background[0] === 'City Watch'){
              cityWatch+=1;
            } else if(dndChars[attributeName].background[0] === 'Courtier'){
              courtier+=1;
            } else if(dndChars[attributeName].background[0].includes('Guild Member')){
              guildMember+=1
            } else {
              other += 1;
            }
          }
        }
      }
      backgroundsCount.push(noble, charlatan, hermit, urchin, soldier, criminal, acolyte, knight, 
        farTraveler, sailor, outlander, factionAgent, sage, ubh, entertainer, folkHero, 
        hauntedOne, mercenaryVeteran, barbarianTribeMember, guildArtisan, cloisteredScholar,
        clanCrafter, cityWatch, courtier, guildMember, other);
      return backgroundsCount;
    }
    static async countAlignmentMatrix(){
      const dndChars = await dbService.db.collection('dnd').find().toArray();
      /*  Order of the Matrix Table
      Rows:
      Lawful Good
      Lawful Neutral
      Lawful Evil
      Neutral Good
      Neutral
      Neutral Evil
      Chaotic Good
      Chaotic Neutral
      Chaotic Evil

      Columns:
      Artificer | Barbarian | Bard | Cleric | Druid | Monk | Paladin | Ranger | Blood Hunter | Rogue | Warlock | Wizard | Other
      */
      let alignmentMatrix2 = {array: [["abc"],["def"],["ghi"]]};
      let alignmentMatrix = [
      [" ","Artificer", "Barbarian", "Bard", "Cleric", "Druid", "Fighter", "Monk", "Paladin", "Ranger", "Blood Hunter", "Rogue", "Warlock", "Wizard", "Other", "Alignment Total"],
      ["Lawful Good", 0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
      ["Lawful Neutral", 0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
      ["Lawful Evil", 0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
      ["Neutral Good", 0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
      ["Neutral", 0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
      ["Neutral Evil", 0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
      ["Chaotic Good", 0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
      ["Chaotic Neutral", 0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
      ["Chaotic Evil", 0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
      ["Classes Total", 0,0,0,0,0,0,0,0,0,0,0,0,0,0,0]];
      for(let attributeName in dndChars){
        if(dndChars[attributeName].alignment){
          if(dndChars[attributeName].alignment.toLowerCase() === 'lawful good' | dndChars[attributeName].alignment.toLowerCase() === 'lg'){
            if(dndChars[attributeName].class.length > 0){
              //Alignment Total
              alignmentMatrix[1][15] += 1;
              if(dndChars[attributeName].class === 'Artificer'){
                //Class Total
                alignmentMatrix[10][1] += 1;
                //Class + Alignment total
                alignmentMatrix[1][1] += 1;
              } else if(dndChars[attributeName].class === 'Barbarian'){
                alignmentMatrix[10][2] += 1;

                alignmentMatrix[1][2] += 1;
              } else if(dndChars[attributeName].class === 'Bard'){
                alignmentMatrix[10][3] += 1;

                alignmentMatrix[1][3] += 1;
              } else if(dndChars[attributeName].class === 'Cleric'){
                alignmentMatrix[10][4] += 1;

                alignmentMatrix[1][4] += 1;
              } else if(dndChars[attributeName].class === 'Druid'){
                alignmentMatrix[10][5] += 1;

                alignmentMatrix[1][5] += 1;
              } else if(dndChars[attributeName].class === 'Fighter'){
                alignmentMatrix[10][6] += 1;

                alignmentMatrix[1][6] += 1;
              } else if(dndChars[attributeName].class === 'Monk'){
                alignmentMatrix[10][7] += 1;

                alignmentMatrix[1][7] += 1;
              } else if(dndChars[attributeName].class === 'Paladin'){
                alignmentMatrix[10][8] += 1;

                alignmentMatrix[1][8] += 1;
                //Ranger got buffed because it was really weak on release, called Revised Ranger, counting towards the same because same class
              } else if(dndChars[attributeName].class === 'Ranger' | dndChars[attributeName].class === 'Revised Ranger'){
                alignmentMatrix[10][9] += 1;

                alignmentMatrix[1][9] += 1;
              } else if(dndChars[attributeName].class === 'Blood Hunter'){
                alignmentMatrix[10][10] += 1;

                alignmentMatrix[1][10] += 1;
              } else if(dndChars[attributeName].class === 'Rogue'){
                alignmentMatrix[10][11] += 1;

                alignmentMatrix[1][11] += 1;
              } else if(dndChars[attributeName].class === 'Warlock'){
                alignmentMatrix[10][12] += 1;

                alignmentMatrix[1][12] += 1;
              } else if(dndChars[attributeName].class === 'Wizard'){
                alignmentMatrix[10][13] += 1;

                alignmentMatrix[1][13] += 1;
              } else {
                alignmentMatrix[10][14] += 1;

                alignmentMatrix[1][14] += 1;
              }
            }
          } else if(dndChars[attributeName].alignment.toLowerCase() === 'lawful neutral' | dndChars[attributeName].alignment.toLowerCase() === 'ln'){
            if(dndChars[attributeName].class.length > 0){
              alignmentMatrix[2][15] += 1;
              if(dndChars[attributeName].class === 'Artificer'){
                alignmentMatrix[10][1] += 1;
                alignmentMatrix[2][1] += 1;
              } else if(dndChars[attributeName].class === 'Barbarian'){
                alignmentMatrix[10][2] += 1;
                alignmentMatrix[2][2] += 1;
              } else if(dndChars[attributeName].class === 'Bard'){
                alignmentMatrix[10][3] += 1;
                alignmentMatrix[2][3] += 1;
              } else if(dndChars[attributeName].class === 'Cleric'){
                alignmentMatrix[10][4] += 1;
                alignmentMatrix[2][4] += 1;
              } else if(dndChars[attributeName].class === 'Druid'){
                alignmentMatrix[10][5] += 1;
                alignmentMatrix[2][5] += 1;
              } else if(dndChars[attributeName].class === 'Fighter'){
                alignmentMatrix[10][6] += 1;
                alignmentMatrix[2][6] += 1;
              } else if(dndChars[attributeName].class === 'Monk'){
                alignmentMatrix[10][7] += 1;
                alignmentMatrix[2][7] += 1;
              } else if(dndChars[attributeName].class === 'Paladin'){
                alignmentMatrix[10][8] += 1;
                alignmentMatrix[2][8] += 1;
                //Ranger got buffed because it was really weak on release, called Revised Ranger, counting towards the same because same class
              } else if(dndChars[attributeName].class === 'Ranger' | dndChars[attributeName].class === 'Revised Ranger'){
                alignmentMatrix[10][9] += 1;
                alignmentMatrix[2][9] += 1;
              } else if(dndChars[attributeName].class === 'Blood Hunter'){
                alignmentMatrix[10][10] += 1;
                alignmentMatrix[2][10] += 1;
              } else if(dndChars[attributeName].class === 'Rogue'){
                alignmentMatrix[10][11] += 1;
                alignmentMatrix[2][11] += 1;
              } else if(dndChars[attributeName].class === 'Warlock'){
                alignmentMatrix[10][12] += 1;
                alignmentMatrix[2][12] += 1;
              } else if(dndChars[attributeName].class === 'Wizard'){
                alignmentMatrix[10][13] += 1;
                alignmentMatrix[2][13] += 1;
              } else {
                alignmentMatrix[10][14] += 1;
                alignmentMatrix[2][14] += 1;
              }
            }
          } else if(dndChars[attributeName].alignment.toLowerCase() === 'lawful evil' | dndChars[attributeName].alignment.toLowerCase() === 'le'){
            if(dndChars[attributeName].class.length > 0){
              alignmentMatrix[3][15] += 1;
              if(dndChars[attributeName].class === 'Artificer'){
                alignmentMatrix[10][1] += 1;
                alignmentMatrix[3][1] += 1;
              } else if(dndChars[attributeName].class === 'Barbarian'){
                alignmentMatrix[10][2] += 1;
                alignmentMatrix[3][2] += 1;
              } else if(dndChars[attributeName].class === 'Bard'){
                alignmentMatrix[10][3] += 1;
                alignmentMatrix[3][3] += 1;
              } else if(dndChars[attributeName].class === 'Cleric'){
                alignmentMatrix[10][4] += 1;
                alignmentMatrix[3][4] += 1;
              } else if(dndChars[attributeName].class === 'Druid'){
                alignmentMatrix[10][5] += 1;
                alignmentMatrix[3][5] += 1;
              } else if(dndChars[attributeName].class === 'Fighter'){
                alignmentMatrix[10][6] += 1;
                alignmentMatrix[3][6] += 1;
              } else if(dndChars[attributeName].class === 'Monk'){
                alignmentMatrix[10][7] += 1;
                alignmentMatrix[3][7] += 1;
              } else if(dndChars[attributeName].class === 'Paladin'){
                alignmentMatrix[10][8] += 1;
                alignmentMatrix[3][8] += 1;
                //Ranger got buffed because it was really weak on release, called Revised Ranger, counting towards the same because same class
              } else if(dndChars[attributeName].class === 'Ranger' | dndChars[attributeName].class === 'Revised Ranger'){
                alignmentMatrix[10][9] += 1;
                alignmentMatrix[3][9] += 1;
              } else if(dndChars[attributeName].class === 'Blood Hunter'){
                alignmentMatrix[10][10] += 1;
                alignmentMatrix[3][10] += 1;
              } else if(dndChars[attributeName].class === 'Rogue'){
                alignmentMatrix[10][11] += 1;
                alignmentMatrix[3][11] += 1;
              } else if(dndChars[attributeName].class === 'Warlock'){
                alignmentMatrix[10][12] += 1;
                alignmentMatrix[3][12] += 1;
              } else if(dndChars[attributeName].class === 'Wizard'){
                alignmentMatrix[10][13] += 1;
                alignmentMatrix[3][13] += 1;
              } else {
                alignmentMatrix[10][14] += 1;
                alignmentMatrix[3][14] += 1;
              }
            }
          } else if(dndChars[attributeName].alignment.toLowerCase() === 'neutral good' | dndChars[attributeName].alignment.toLowerCase() === 'ng'){
            if(dndChars[attributeName].class.length > 0){
              alignmentMatrix[4][15] += 1;
              if(dndChars[attributeName].class === 'Artificer'){
                alignmentMatrix[10][1] += 1;
                alignmentMatrix[4][1] += 1;
              } else if(dndChars[attributeName].class === 'Barbarian'){
                alignmentMatrix[10][2] += 1;
                alignmentMatrix[4][2] += 1;
              } else if(dndChars[attributeName].class === 'Bard'){
                alignmentMatrix[10][3] += 1;
                alignmentMatrix[4][3] += 1;
              } else if(dndChars[attributeName].class === 'Cleric'){
                alignmentMatrix[10][4] += 1;
                alignmentMatrix[4][4] += 1;
              } else if(dndChars[attributeName].class === 'Druid'){
                alignmentMatrix[10][5] += 1;
                alignmentMatrix[4][5] += 1;
              } else if(dndChars[attributeName].class === 'Fighter'){
                alignmentMatrix[10][6] += 1;
                alignmentMatrix[4][6] += 1;
              } else if(dndChars[attributeName].class === 'Monk'){
                alignmentMatrix[10][7] += 1;
                alignmentMatrix[4][7] += 1;
              } else if(dndChars[attributeName].class === 'Paladin'){
                alignmentMatrix[10][8] += 1;
                alignmentMatrix[4][8] += 1;
                //Ranger got buffed because it was really weak on release, called Revised Ranger, counting towards the same because same class
              } else if(dndChars[attributeName].class === 'Ranger' | dndChars[attributeName].class === 'Revised Ranger'){
                alignmentMatrix[10][9] += 1;
                alignmentMatrix[4][9] += 1;
              } else if(dndChars[attributeName].class === 'Blood Hunter'){
                alignmentMatrix[10][10] += 1;
                alignmentMatrix[4][10] += 1;
              } else if(dndChars[attributeName].class === 'Rogue'){
                alignmentMatrix[10][11] += 1;
                alignmentMatrix[4][11] += 1;
              } else if(dndChars[attributeName].class === 'Warlock'){
                alignmentMatrix[10][12] += 1;
                alignmentMatrix[4][12] += 1;
              } else if(dndChars[attributeName].class === 'Wizard'){
                alignmentMatrix[10][13] += 1;
                alignmentMatrix[4][13] += 1;
              } else {
                alignmentMatrix[10][14] += 1;
                alignmentMatrix[4][14] += 1;
              }
            }
          } else if(dndChars[attributeName].alignment.toLowerCase() === 'neutral' | dndChars[attributeName].alignment.toLowerCase() === 'n' | dndChars[attributeName].alignment.toLowerCase() === 'true neutral'){
            if(dndChars[attributeName].class.length > 0){
              alignmentMatrix[5][15] += 1;
              if(dndChars[attributeName].class === 'Artificer'){
                alignmentMatrix[10][1] += 1;
                alignmentMatrix[5][1] += 1;
              } else if(dndChars[attributeName].class === 'Barbarian'){
                alignmentMatrix[10][2] += 1;
                alignmentMatrix[5][2] += 1;
              } else if(dndChars[attributeName].class === 'Bard'){
                alignmentMatrix[10][3] += 1;
                alignmentMatrix[5][3] += 1;
              } else if(dndChars[attributeName].class === 'Cleric'){
                alignmentMatrix[10][4] += 1;
                alignmentMatrix[5][4] += 1;
              } else if(dndChars[attributeName].class === 'Druid'){
                alignmentMatrix[10][5] += 1;
                alignmentMatrix[5][5] += 1;
              } else if(dndChars[attributeName].class === 'Fighter'){
                alignmentMatrix[10][6] += 1;
                alignmentMatrix[5][6] += 1;
              } else if(dndChars[attributeName].class === 'Monk'){
                alignmentMatrix[10][7] += 1;
                alignmentMatrix[5][7] += 1;
              } else if(dndChars[attributeName].class === 'Paladin'){
                alignmentMatrix[10][8] += 1;
                alignmentMatrix[5][8] += 1;
                //Ranger got buffed because it was really weak on release, called Revised Ranger, counting towards the same because same class
              } else if(dndChars[attributeName].class === 'Ranger' | dndChars[attributeName].class === 'Revised Ranger'){
                alignmentMatrix[10][9] += 1;
                alignmentMatrix[5][9] += 1;
              } else if(dndChars[attributeName].class === 'Blood Hunter'){
                alignmentMatrix[10][10] += 1;
                alignmentMatrix[5][10] += 1;
              } else if(dndChars[attributeName].class === 'Rogue'){
                alignmentMatrix[10][11] += 1;
                alignmentMatrix[5][11] += 1;
              } else if(dndChars[attributeName].class === 'Warlock'){
                alignmentMatrix[10][12] += 1;
                alignmentMatrix[5][12] += 1;
              } else if(dndChars[attributeName].class === 'Wizard'){
                alignmentMatrix[10][13] += 1;
                alignmentMatrix[5][13] += 1;
              } else {
                alignmentMatrix[10][14] += 1;
                alignmentMatrix[5][14] += 1;
              }
            }
          } else if(dndChars[attributeName].alignment.toLowerCase() === 'neutral evil' | dndChars[attributeName].alignment.toLowerCase() === 'ne'){
            console.log(dndChars[attributeName].class);
            if(dndChars[attributeName].class.length > 0){
              alignmentMatrix[6][15] += 1;
              if(dndChars[attributeName].class === 'Artificer'){
                alignmentMatrix[10][1] += 1;
                alignmentMatrix[6][1] += 1;
              } else if(dndChars[attributeName].class === 'Barbarian'){
                alignmentMatrix[10][2] += 1;
                alignmentMatrix[6][2] += 1;
              } else if(dndChars[attributeName].class === 'Bard'){
                alignmentMatrix[10][3] += 1;
                alignmentMatrix[6][3] += 1;
              } else if(dndChars[attributeName].class === 'Cleric'){
                alignmentMatrix[10][4] += 1;
                alignmentMatrix[6][4] += 1;
              } else if(dndChars[attributeName].class === 'Druid'){
                alignmentMatrix[10][5] += 1;
                alignmentMatrix[6][5] += 1;
              } else if(dndChars[attributeName].class === 'Fighter'){
                alignmentMatrix[10][6] += 1;
                alignmentMatrix[6][6] += 1;
              } else if(dndChars[attributeName].class === 'Monk'){
                alignmentMatrix[10][7] += 1;
                alignmentMatrix[6][7] += 1;
              } else if(dndChars[attributeName].class === 'Paladin'){
                alignmentMatrix[10][8] += 1;
                alignmentMatrix[6][8] += 1;
                //Ranger got buffed because it was really weak on release, called Revised Ranger, counting towards the same because same class
              } else if(dndChars[attributeName].class === 'Ranger' | dndChars[attributeName].class === 'Revised Ranger'){
                alignmentMatrix[10][9] += 1;
                alignmentMatrix[6][9] += 1;
              } else if(dndChars[attributeName].class === 'Blood Hunter'){
                alignmentMatrix[10][10] += 1;
                alignmentMatrix[6][10] += 1;
              } else if(dndChars[attributeName].class === 'Rogue'){
                alignmentMatrix[10][11] += 1;
                alignmentMatrix[6][11] += 1;
              } else if(dndChars[attributeName].class === 'Warlock'){
                alignmentMatrix[10][12] += 1;
                alignmentMatrix[6][12] += 1;
              } else if(dndChars[attributeName].class === 'Wizard'){
                alignmentMatrix[10][13] += 1;
                alignmentMatrix[6][13] += 1;
              } else {
                alignmentMatrix[10][14] += 1;
                alignmentMatrix[6][14] += 1;
              }
            }
          } else if(dndChars[attributeName].alignment.toLowerCase() === 'chaotic good' | dndChars[attributeName].alignment.toLowerCase() === 'cg'){
            if(dndChars[attributeName].class.length > 0){
              alignmentMatrix[7][15] += 1;
              if(dndChars[attributeName].class === 'Artificer'){
                alignmentMatrix[10][1] += 1;
                alignmentMatrix[7][1] += 1;
              } else if(dndChars[attributeName].class === 'Barbarian'){
                alignmentMatrix[10][2] += 1;
                alignmentMatrix[7][2] += 1;
              } else if(dndChars[attributeName].class === 'Bard'){
                alignmentMatrix[10][3] += 1;
                alignmentMatrix[7][3] += 1;
              } else if(dndChars[attributeName].class === 'Cleric'){
                alignmentMatrix[10][4] += 1;
                alignmentMatrix[7][4] += 1;
              } else if(dndChars[attributeName].class === 'Druid'){
                alignmentMatrix[10][5] += 1;
                alignmentMatrix[7][5] += 1;
              } else if(dndChars[attributeName].class === 'Fighter'){
                alignmentMatrix[10][6] += 1;
                alignmentMatrix[7][6] += 1;
              } else if(dndChars[attributeName].class === 'Monk'){
                alignmentMatrix[10][7] += 1;
                alignmentMatrix[7][7] += 1;
              } else if(dndChars[attributeName].class === 'Paladin'){
                alignmentMatrix[10][8] += 1;
                alignmentMatrix[7][8] += 1;
                //Ranger got buffed because it was really weak on release, called Revised Ranger, counting towards the same because same class
              } else if(dndChars[attributeName].class === 'Ranger' | dndChars[attributeName].class === 'Revised Ranger'){
                alignmentMatrix[10][9] += 1;
                alignmentMatrix[7][9] += 1;
              } else if(dndChars[attributeName].class === 'Blood Hunter'){
                alignmentMatrix[10][10] += 1;
                alignmentMatrix[7][10] += 1;
              } else if(dndChars[attributeName].class === 'Rogue'){
                alignmentMatrix[10][11] += 1;
                alignmentMatrix[7][11] += 1;
              } else if(dndChars[attributeName].class === 'Warlock'){
                alignmentMatrix[10][12] += 1;
                alignmentMatrix[7][12] += 1;
              } else if(dndChars[attributeName].class === 'Wizard'){
                alignmentMatrix[10][13] += 1;
                alignmentMatrix[7][13] += 1;
              } else {
                alignmentMatrix[10][14] += 1;
                alignmentMatrix[7][14] += 1;
              }
            }
          } else if(dndChars[attributeName].alignment.toLowerCase() === 'chaotic neutral' | dndChars[attributeName].alignment.toLowerCase() === 'cn'){
            if(dndChars[attributeName].class.length > 0){
              alignmentMatrix[8][15] += 1;
              if(dndChars[attributeName].class === 'Artificer'){
                alignmentMatrix[10][1] += 1;
                alignmentMatrix[8][1] += 1;
              } else if(dndChars[attributeName].class === 'Barbarian'){
                alignmentMatrix[10][2] += 1;
                alignmentMatrix[8][2] += 1;
              } else if(dndChars[attributeName].class === 'Bard'){
                alignmentMatrix[10][3] += 1;
                alignmentMatrix[8][3] += 1;
              } else if(dndChars[attributeName].class === 'Cleric'){
                alignmentMatrix[10][4] += 1;
                alignmentMatrix[8][4] += 1;
              } else if(dndChars[attributeName].class === 'Druid'){
                alignmentMatrix[10][5] += 1;
                alignmentMatrix[8][5] += 1;
              } else if(dndChars[attributeName].class === 'Fighter'){
                alignmentMatrix[10][6] += 1;
                alignmentMatrix[8][6] += 1;
              } else if(dndChars[attributeName].class === 'Monk'){
                alignmentMatrix[10][7] += 1;
                alignmentMatrix[8][7] += 1;
              } else if(dndChars[attributeName].class === 'Paladin'){
                alignmentMatrix[10][8] += 1;
                alignmentMatrix[8][8] += 1;
                //Ranger got buffed because it was really weak on release, called Revised Ranger, counting towards the same because same class
              } else if(dndChars[attributeName].class === 'Ranger' | dndChars[attributeName].class === 'Revised Ranger'){
                alignmentMatrix[10][9] += 1;
                alignmentMatrix[8][9] += 1;
              } else if(dndChars[attributeName].class === 'Blood Hunter'){
                alignmentMatrix[10][10] += 1;
                alignmentMatrix[8][10] += 1;
              } else if(dndChars[attributeName].class === 'Rogue'){
                alignmentMatrix[10][11] += 1;
                alignmentMatrix[8][11] += 1;
              } else if(dndChars[attributeName].class === 'Warlock'){
                alignmentMatrix[10][12] += 1;
                alignmentMatrix[8][12] += 1;
              } else if(dndChars[attributeName].class === 'Wizard'){
                alignmentMatrix[10][13] += 1;
                alignmentMatrix[8][13] += 1;
              } else {
                alignmentMatrix[10][14] += 1;
                alignmentMatrix[8][14] += 1;
              }
            }
          } else if(dndChars[attributeName].alignment.toLowerCase() === 'chaotic evil' | dndChars[attributeName].alignment.toLowerCase() === 'ce'){
            console.log(dndChars[attributeName].class);
            console.log(dndChars[attributeName].alignment);
            if(dndChars[attributeName].class.length > 0){
              alignmentMatrix[9][15] += 1;
              if(dndChars[attributeName].class === 'Artificer'){
                alignmentMatrix[10][1] += 1;
                alignmentMatrix[9][1] += 1;
              } else if(dndChars[attributeName].class === 'Barbarian'){
                alignmentMatrix[10][2] += 1;
                alignmentMatrix[9][2] += 1;
              } else if(dndChars[attributeName].class === 'Bard'){
                alignmentMatrix[10][3] += 1;
                alignmentMatrix[9][3] += 1;
              } else if(dndChars[attributeName].class === 'Cleric'){
                alignmentMatrix[10][4] += 1;
                alignmentMatrix[9][4] += 1;
              } else if(dndChars[attributeName].class === 'Druid'){
                alignmentMatrix[10][5] += 1;
                alignmentMatrix[9][5] += 1;
              } else if(dndChars[attributeName].class === 'Fighter'){
                alignmentMatrix[10][6] += 1;
                alignmentMatrix[9][6] += 1;
              } else if(dndChars[attributeName].class === 'Monk'){
                alignmentMatrix[10][7] += 1;
                alignmentMatrix[9][7] += 1;
              } else if(dndChars[attributeName].class === 'Paladin'){
                alignmentMatrix[10][8] += 1;
                alignmentMatrix[9][8] += 1;
                //Ranger got buffed because it was really weak on release, called Revised Ranger, counting towards the same because same class
              } else if(dndChars[attributeName].class === 'Ranger' | dndChars[attributeName].class === 'Revised Ranger'){
                alignmentMatrix[10][9] += 1;
                alignmentMatrix[9][9] += 1;
              } else if(dndChars[attributeName].class === 'Blood Hunter'){
                alignmentMatrix[10][10] += 1;
                alignmentMatrix[9][10] += 1;
              } else if(dndChars[attributeName].class === 'Rogue'){
                alignmentMatrix[10][11] += 1;
                alignmentMatrix[9][11] += 1;
              } else if(dndChars[attributeName].class === 'Warlock'){
                alignmentMatrix[10][12] += 1;
                alignmentMatrix[9][12] += 1;
              } else if(dndChars[attributeName].class === 'Wizard'){
                alignmentMatrix[10][13] += 1;
                alignmentMatrix[9][13] += 1;
              } else {
                alignmentMatrix[10][14] += 1;
                alignmentMatrix[9][14] += 1;
              }
            }
          }
        }
      }
      for(let i = 0; i<alignmentMatrix.length; i++){
        console.log(alignmentMatrix[i].length);
      }
      return alignmentMatrix;
    }
}
