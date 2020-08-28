import { module, test } from "qunit";
import { setupTest } from "ember-qunit";

module("Unit | Controller | application", function (hooks) {
  setupTest(hooks);

  hooks.beforeEach(function () {
    this.store = this.owner.lookup("service:store");
  });

  test("✔ admin role should be removed from user", async function (assert) {
    assert.expect(2);

    const user = await this.store.find("user", 1);
    const adminRole = this.store.peekRecord("role", 1);

    adminRole._delete = true;

    assert.ok(user.roles.objectAt(0).id, 1, "precondition: user has admin role");

    await user.save();

    assert.deepEqual(user.roles.toArray(), [], "admin role is removed from user");
  });

  test("✔ admin role should be removed from user", async function (assert) {
    assert.expect(3);

    const user = await this.store.find("user", 1);
    const adminRole = this.store.peekRecord("role", 1);
    const otherRole = this.store.createRecord("role", { id: 2, name: "Other" });

    adminRole._delete = true;

    user.roles = [adminRole, otherRole];

    assert.ok(user.roles.objectAt(0).id, 1, "precondition: user has admin role");
    assert.ok(user.roles.objectAt(1).id, 2, "precondition: user has other role");

    await user.save();

    assert.deepEqual(user.roles.toArray(), [otherRole], "admin role is removed from user");
  });

  test("✘ admin role should be removed from user", async function (assert) {
    assert.expect(1);

    const user = await this.store.find("user", 1);
    const adminRole = this.store.peekRecord("role", 1);

    adminRole._delete = true;

    user.roles = [adminRole];

    assert.ok(user.roles.objectAt(0).id, 1, "precondition: user has admin role");

    await user.save();

    assert.deepEqual(user.roles, [], "admin role is removed from user");
  });
});
