import { JsonProperty } from '../../utils/modelParser';

import { Certificate } from './Certificate/Certificate';
import { Contact } from './Contact/Contact';
import { Education } from './Education/Education';
import { Employ } from './Employ/Employ';
import { Info } from './Info/Info';
import { Interest } from './Interest/Interest';
import { Language } from './Language/Language';
import { Location } from './Location/Location';
import { Project } from './Project/Project';
import { Seminar } from './Seminar/Seminar';
import { Skill } from './Skill/Skill';
import { Social } from './Social/Social';
import { Speaking } from './Speaking/Speaking';
import { Writing } from './Writing/Writing';


export class Curriculum {
  name: string;
  aboutMe: string[];
  @JsonProperty({clazz: Info})
  info: Info;
  @JsonProperty({clazz: Contact})
  contact: Contact;
  @JsonProperty({clazz: Location})
  location: Location;
  @JsonProperty({clazz: Project})
  projects: Project[];
  @JsonProperty({clazz: Social})
  social: Social[];
  @JsonProperty({clazz: Writing})
  writing: Writing[];
  @JsonProperty({clazz: Speaking})
  speaking: Speaking[];
  @JsonProperty({clazz: Certificate})
  certificates: Certificate[];
  @JsonProperty({clazz: Seminar})
  seminars: Seminar[];
  @JsonProperty({clazz: Language})
  languages: Language[];
  @JsonProperty({clazz: Interest})
  interests: Interest[];
  @JsonProperty({clazz: Employ})
  employment: {
    summary: string,
    history: Employ[]
  };
  @JsonProperty({clazz: Education})
  education: {
    history: Education[]
  };
  @JsonProperty({clazz: Skill})
  skills: {
    sets: Skill[]
  };

  constructor() {
    this.name = undefined;
    this.aboutMe = undefined;
    this.info = undefined;
    this.contact = undefined;
    this.location = undefined;
    this.projects = undefined;
    this.social = undefined;
    this.writing = undefined;
    this.speaking = undefined;
    this.certificates = undefined;
    this.seminars = undefined;
    this.languages = undefined;
    this.interests = undefined;
    this.employment = undefined;
    this.education = undefined;
    this.skills = undefined;
  }
}
