import { Performable, Actor } from '../core/types';
import { Navigate } from '../interactions/Navigate';
import { Enter } from '../interactions/Enter';
import { Click } from '../interactions/Click';
import { Select } from '../interactions/Select';
import * as UI from '../ui/SignUpUI';

export interface UserRegistrationData {
  name: string;
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  address: string;
  country: string;
  state: string;
  city: string;
  zipcode: string;
  mobile: string;
}

export class Register implements Performable {
  private constructor(private data: UserRegistrationData) {}

  static withData(data: UserRegistrationData): Register {
    return new Register(data);
  }

  async performAs(actor: Actor): Promise<void> {
    await actor.attemptsTo(
      Navigate.to('/login'),
      Enter.value(this.data.name).into(UI.SIGNUP_NAME),
      Enter.value(this.data.email).into(UI.SIGNUP_EMAIL),
      Click.on(UI.SIGNUP_BUTTON),
      
      // Account Info
      Click.on(UI.GENDER_MR),
      Enter.value(this.data.password).into(UI.PASSWORD),
      Select.value('1').from(UI.DAYS),
      Select.value('1').from(UI.MONTHS),
      Select.value('2000').from(UI.YEARS),
      
      // Address Info
      Enter.value(this.data.firstName).into(UI.FIRST_NAME),
      Enter.value(this.data.lastName).into(UI.LAST_NAME),
      Enter.value(this.data.address).into(UI.ADDRESS1),
      Select.value(this.data.country).from(UI.COUNTRY),
      Enter.value(this.data.state).into(UI.STATE),
      Enter.value(this.data.city).into(UI.CITY),
      Enter.value(this.data.zipcode).into(UI.ZIPCODE),
      Enter.value(this.data.mobile).into(UI.MOBILE_NUMBER),
      
      Click.on(UI.CREATE_ACCOUNT_BUTTON)
    );
  }
}
