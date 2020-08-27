import Model from '@ember-data/model';
import { attr } from '@ember-data/model';

export default class RoleModel extends Model {
  @attr() name;
  @attr() _delete;
}
