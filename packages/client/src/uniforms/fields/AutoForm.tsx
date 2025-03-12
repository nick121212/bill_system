import { AutoForm } from 'uniforms';

import ValidatedQuickForm from './ValidatedQuickForm';

function Auto(parent: unknown) {
  class _ extends AutoForm.Auto(parent) {
    static Auto = Auto;
  }

  return _ as unknown as AutoForm;
}

export default Auto(ValidatedQuickForm);
