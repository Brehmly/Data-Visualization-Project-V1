
let pathCounter = 0;

function parseDND(){
  let counter = 0;
  for(let attributeName in dndChars){
    if(counter<2){
      console.log('Race: ' + dndChars[attributeName].race.processedRace[0]);
      console.log('Alignment: ' + dndChars[attributeName].alignment.alignment[0]);
      console.log('Background: ' + dndChars[attributeName].background[0]);
      for(let playerClass in dndChars[attributeName].class){
        console.log("Class: " + dndChars[attributeName].class[playerClass].class[0] + " Subclass: " + dndChars[attributeName].class[playerClass].subclass[0]);
      }
      //console.log('Class: ' + dndChars[attributeName].class);
      //.class + ' ' + dndChars[attributeName].class.subclass);
      console.log('Level: ' + dndChars[attributeName].level[0]);
      console.log('Skills: ' + dndChars[attributeName].skills);
      console.log('Attributes: Strength: ' + dndChars[attributeName].attributes.Str +
          ' Dexterity: ' + dndChars[attributeName].attributes.Dex +
          ' Constitution ' + dndChars[attributeName].attributes.Con +
          ' Intelligence ' + dndChars[attributeName].attributes.Int +
          ' Wisdom ' + dndChars[attributeName].attributes.Wis +
          ' Charisma ' + dndChars[attributeName].attributes.Cha );
      console.log('---------------');
      counter +=1;
    }
  }
}


function parsePathfinder(){
  let race = '';
  let otherRace = '';
  let playerClass = '';
  let otherClass = '';
  let prestigeClass = '';

  let races = [];
  let classes = [];
  let prestigeClasses = [];
  let raceAndClasses = [];
  let typesOfPlay = [];

  function removeSubstring(incString){
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
      } else {
        return incString;
      }
    } else {
      console.log('Not a string')
    }

  }
  console.log('--------------------------');
  console.log('START OF PATHFINDER');
  console.log('--------------------------');
  for (let pathName in pathfinderCharacters){
    if(pathCounter<200){

      typesOfPlay.push(pathfinderCharacters[pathName].typeOfPlay);

      if(removeSubstring(pathfinderCharacters[pathName].race).length > 0){
        races.push(removeSubstring(pathfinderCharacters[pathName].race));
      } else if(removeSubstring(pathfinderCharacters[pathName].otherRace > 0)){
        races.push(removeSubstring(pathfinderCharacters[pathName].race));
      } else {
        console.log('No Race');
      }

      if(removeSubstring(pathfinderCharacters[pathName].class).length>0){
        classes.push(removeSubstring(pathfinderCharacters[pathName].class));
      } else if(removeSubstring(pathfinderCharacters[pathName].otherClass).length>0){
        classes.push(removeSubstring(pathfinderCharacters[pathName].otherClass));
      } else {
        console.log('No class');
      }

      if(removeSubstring(pathfinderCharacters[pathName].class).length>0 & removeSubstring(pathfinderCharacters[pathName].race).length>0){
        raceAndClasses.push({race: removeSubstring(pathfinderCharacters[pathName].race), class: removeSubstring(pathfinderCharacters[pathName].class)});

      } else if(removeSubstring(pathfinderCharacters[pathName].class).length>0 & removeSubstring(pathfinderCharacters[pathName].otherRace).length>0){
        raceAndClasses.push({race: removeSubstring(pathfinderCharacters[pathName].otherRace), class: removeSubstring(pathfinderCharacters[pathName].class)});

      } else if(removeSubstring(pathfinderCharacters[pathName].otherClass).length>0 & removeSubstring(pathfinderCharacters[pathName].race).length>0){
        raceAndClasses.push({race: removeSubstring(pathfinderCharacters[pathName].race), class: removeSubstring(pathfinderCharacters[pathName].otherClass)});

      } else if(removeSubstring(pathfinderCharacters[pathName].otherClass).length>0 & removeSubstring(pathfinderCharacters[pathName].otherRace).length>0){
        raceAndClasses.push({race: removeSubstring(pathfinderCharacters[pathName].otherRace), class: removeSubstring(pathfinderCharacters[pathName].otherClass)});
      } else {
        console.log('You are out of luck');
      }

      if(removeSubstring(pathfinderCharacters[pathName].prestigeClass).length>0){
        prestigeClasses.push(removeSubstring(pathfinderCharacters[pathName].prestigeClass));
      }

      console.log('Better Race: ' + removeSubstring(pathfinderCharacters[pathName].race));
      console.log('Better Other Race: ' + removeSubstring(pathfinderCharacters[pathName].otherRace));
      console.log('Type of play: ' + pathfinderCharacters[pathName].typeOfPlay);
      console.log('Better Class: ' + removeSubstring(pathfinderCharacters[pathName].class));
      console.log('Better other class: ' + removeSubstring(pathfinderCharacters[pathName].otherClass));
      console.log('Better Prestige Class: ' + removeSubstring(pathfinderCharacters[pathName].prestigeClass));
      console.log('--------------------------');
      pathCounter +=1;
    }
    // ARG, CRB, 0A, U, ACG, Eberron, APG, Ultimate Intrigue, UC, (SoP, DDS), Unchained, (PoW, DSP)
  }
  //console.log(typesOfPlay);
  //console.log(classes);
  //console.log(races);
  //console.log(raceAndClasses);
  console.log(prestigeClasses);
}

function getRaces(){
  let races = [];
  for(let attributeName in dndChars){
    if(dndChars[attributeName].race.processedRace[0].length > 0){
      races.push({race: dndChars[attributeName].race.processedRace[0]});
    }
  }
  return races;
}

function getAlignments(){
  let alignments = [];
  for(let attributeName in dndChars){
    alignments.push({alignments: dndChars[attributeName].alignment[0]});
  }
  return alignments;
}
function getBackgrounds(){
  let backgrounds = [];
  for(let attributeName in dndChars){
    backgrounds.push({background: dndChars[attributeName].background[0]});
  }
  return backgrounds;
}
function getClasses(){
  let classes = [];
  for(let attributeName in dndChars){
    for(let playerClass in dndChars[attributeName].class){
      classes.push({class: dndChars[attributeName].class[playerClass].class[0], subClass: dndChars[attributeName].class[playerClass].subClass});
    }
  }
  return classes;
}
function getLevels(){
  let levels = [];
  for(let attributeName in dndChars){
    levels.push({level: dndChars[attributeName].level[0]});
  }
  return levels;
}
function getSkills(){
  let skills = [];
  for(let attributeName in dndChars){
    skills.push({skills: dndChars[attributeName].skills});
  }
  return skills;
}
function getAttributes(){
  let attributes = [];
  for(let attributeName in dndChars){
    attributes.push({strength: dndChars[attributeName].attributes.Str, dexterity: dndChars[attributeName].attributes.Dex, 
      constituion: dndChars[attributeName].attributes.Con, intelligence: dndChars[attributeName].attributes.Int, 
      wisdom: dndChars[attributeName].attributes.Wis, charisma: dndChars[attributeName].attributes.Cha});
  }
  return attributes;
}
function getRaceAndAlignment(){
  let racesAndAlignment = [];
  for(let attributeName in dndChars){
    racesAndAlignment.push({race: dndChars[attributeName].race.processedRace[0], alignment: dndChars[attributeName].alignment[0]});
  }
  return racesAndAlignment;
}
function getRaceAndClass(){
  let raceAndClass = [];
  let race = '';
  let pClass = '';
  for(let attributeName in dndChars){
    race = dndChars[attributeName].race.processedRace[0];
    for(let playerClass in dndChars[attributeName].class){
      pClass = dndChars[attributeName].class[playerClass].class[0];
    }
    raceAndClass.push({race: race, class: pClass});
  }
  return raceAndClass;
}
function getBackgroundAndClass(){
  let backgroundAndClass = [];
  let background = '';
  let pClass = '';
  for(let attributeName in dndChars){
    for(let playerClass in dndChars[attributeName].class){
      pClass = dndChars[attributeName].class[playerClass].class[0];
  }
  background = dndChars[attributeName].background[0];
  backgroundAndClass.push({class: pClass, background: background});
}
  return backgroundAndClass;
}
function getClassAndAlignment(){
  let classAndAlignment = [];
  let alignment = '';
  let pClass = '';
  for(let attributeName in dndChars){
    for(let playerClass in dndChars[attributeName].class){
      pClass = dndChars[attributeName].class[playerClass].class[0];
    }
  alignment = dndChars[attributeName].alignment[0];
  classAndAlignment.push({class: pClass, alignment: alignment});
}
  return classAndAlignment;
}

function getClasses(){
  let classes = [];
  for (let pathName in pathfinderCharacters){
    if(removeSubstring(pathfinderCharacters[pathName].class).length>0){
      classes.push({class: removeSubstring(pathfinderCharacters[pathName].class)});
    } else if(removeSubstring(pathfinderCharacters[pathName].otherClass).length>0){
      classes.push({class: removeSubstring(pathfinderCharacters[pathName].otherClass)});
    } else {
      console.log('No class');
    }
  }
  return classes;
}
//Getting type of play
function getTOP(){
  let typesOfPlay = [];
  for (let pathName in pathfinderCharacters){  
    typesOfPlay.push({typeOfPlay: pathfinderCharacters[pathName].typeOfPlay});
  }
  return typesOfPlay;
}
//Getting Race and classes
function getRAC(){
  let raceAndClasses = [];
  for (let pathName in pathfinderCharacters){ 
    if(removeSubstring(pathfinderCharacters[pathName].class).length>0 & removeSubstring(pathfinderCharacters[pathName].race).length>0){
      raceAndClasses.push({race: removeSubstring(pathfinderCharacters[pathName].race), class: removeSubstring(pathfinderCharacters[pathName].class)});

    } else if(removeSubstring(pathfinderCharacters[pathName].class).length>0 & removeSubstring(pathfinderCharacters[pathName].otherRace).length>0){
      raceAndClasses.push({race: removeSubstring(pathfinderCharacters[pathName].otherRace), class: removeSubstring(pathfinderCharacters[pathName].class)});

    } else if(removeSubstring(pathfinderCharacters[pathName].otherClass).length>0 & removeSubstring(pathfinderCharacters[pathName].race).length>0){
      raceAndClasses.push({race: removeSubstring(pathfinderCharacters[pathName].race), class: removeSubstring(pathfinderCharacters[pathName].otherClass)});

    } else if(removeSubstring(pathfinderCharacters[pathName].otherClass).length>0 & removeSubstring(pathfinderCharacters[pathName].otherRace).length>0){
      raceAndClasses.push({race: removeSubstring(pathfinderCharacters[pathName].otherRace), class: removeSubstring(pathfinderCharacters[pathName].otherClass)});
    } else {
      console.log('You are out of luck');
    }
  }
  return raceAndClasses;
}
function getPrestigeClasses(){
  let prestigeClasses = [];
  for (let pathName in pathfinderCharacters){
    if(removeSubstring(pathfinderCharacters[pathName].prestigeClass).length>0){
      prestigeClasses.push({prestigeClass: removeSubstring(pathfinderCharacters[pathName].prestigeClass)});
    }
  }
  return prestigeClasses;
}