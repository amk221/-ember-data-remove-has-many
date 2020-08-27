import Pretender from 'pretender';

function stringify() {
  return JSON.stringify(arguments[0], null, 2);
}

export function initialize() {
  const server = new Pretender;

  server.get('/users/1', () => {
    const response = stringify({
      user: {
        id: 1,
        name: 'Fred',
        roles: [1]
      },
      roles: [{
        id: 1,
        name: 'Admin'
      }]
    });

    console.log('GET response', response);

    return [200, {}, response];
  });

  server.put('/users/1', (request) => {
    const data = JSON.parse(request.requestBody);

    console.log('PUT request', stringify(data));

    const name = data.user.name;

    const roles = data.user.roles.reduce((roles, role) => {
      if (!role._delete) {
        roles.push(role);
      }
      return roles;
    }, []);

    const response = stringify({
      user: {
        id: 1,
        name,
        roles
      }
    });

    console.log('PUT response', response);

    return [200, {}, response];
  });
}

export default {
  initialize
};
