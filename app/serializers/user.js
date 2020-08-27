import RESTSerializer, { EmbeddedRecordsMixin } from '@ember-data/serializer/rest';

export default class UserSerializer extends RESTSerializer.extend(EmbeddedRecordsMixin) {
  attrs = {
    roles: {
      embedded: 'always'
    }
  };
}
