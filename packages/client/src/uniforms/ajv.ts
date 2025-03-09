import Ajv from "ajv";
import { SomeJSONSchema } from "ajv/dist/types/json-schema";
import JSONSchemaBridge from "uniforms-bridge-json-schema";

const ajv = new Ajv({ allErrors: true, useDefaults: true });

function createValidator(schema: object) {
  const validator = ajv.compile(schema);

  return (model: object) => {
    validator(model);
    return validator.errors?.length ? { details: validator.errors } : null;
  };
}

export function getBridge(schema: SomeJSONSchema) {
  const validator = createValidator(schema);

  return new JSONSchemaBridge({ schema, validator });
}


