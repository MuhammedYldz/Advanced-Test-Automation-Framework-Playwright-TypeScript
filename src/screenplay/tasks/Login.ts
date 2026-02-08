import { Performable, Actor } from '../core/types';
import { Navigate } from '../interactions/Navigate';
import { Enter } from '../interactions/Enter';
import { Click } from '../interactions/Click';
import { EMAIL_INPUT, PASSWORD_INPUT, LOGIN_BUTTON } from '../ui/LoginUI';

export class Login implements Performable {
  private constructor(private email: string, private password: string) {}

  static withCredentials(email: string, password: string): Login {
    return new Login(email, password);
  }

  async performAs(actor: Actor): Promise<void> {
    await actor.attemptsTo(
      Navigate.to('/login'),
      Enter.value(this.email).into(EMAIL_INPUT),
      Enter.value(this.password).into(PASSWORD_INPUT),
      Click.on(LOGIN_BUTTON),
    );
  }
}
