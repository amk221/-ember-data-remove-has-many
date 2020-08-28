import Controller from '@ember/controller';
import { action } from '@ember/object';
import { inject } from '@ember/service';

export default class ApplicationController extends Controller {
  @inject store;

  @action
  save() {
    const adminRole = this.store.peekRecord('role', 1);

    // Temporarily flag the admin role for deletion.
    // This is because the API will only remove a role from a user
    // if _delete is true.
    //
    // The user will be saved, sending a payload like so:
    //
    // {
    //   "id": "1",
    //   "name": "Fred",
    //   "roles": [
    //     {
    //       "id": "1",
    //       "name": "Admin",
    //       "_delete": true
    //     }
    //   ]
    // }
    //
    // The API will return a response saying the role was deleted:
    //
    //
    // {
    //   "id": "1",
    //   "name": "Fred (changed)",
    //   "roles": []
    // }
    //
    // ...but the role will not be removed from the user in the client :(

    adminRole._delete = true;

    this.model.name = 'Fred (changed)';
    this.model.roles = [adminRole];

    return this.model.save().then(() => {
      adminRole._delete = false;
    });
  }
}
