import { util } from '@aws-appsync/utils';

export function request(ctx) {
  return {
    operation: 'UpdateItem',
    key: util.dynamodb.toMapValues({ id: ctx.args.id }),
    update: {
      expression: 'SET #completed = NOT #completed, #updatedAt = :updatedAt, #version = #version + :inc',
      expressionNames: {
        '#completed': 'completed',
        '#updatedAt': 'updatedAt',
        '#version': 'version'
      },
      expressionValues: util.dynamodb.toMapValues({
        ':updatedAt': util.time.nowISO8601(),
        ':inc': 1
      })
    }
  };
}

export function response(ctx) {
  return ctx.result;
}
