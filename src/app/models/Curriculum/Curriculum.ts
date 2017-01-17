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
  info: Info;
  contact: Contact;
  location: Location;
  projects: Array<Project>;
  social: Array<Social>;
  employment: {
    summary: string,
    history: Array<Employ>
  };
  education: {
    history: Array<Education>
  };
  skills: {
    sets: Array<Skill>
  }
  writing: Array<Writing>;
  speaking: Array<Speaking>;
  certificates: Array<Certificate>;
  seminars: Array<Seminar>;
  languages: Array<Language>;
  interests: Array<Interest>;
  aboutMe: Array<string>;
}