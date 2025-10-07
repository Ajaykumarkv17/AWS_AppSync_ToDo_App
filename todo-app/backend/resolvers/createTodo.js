import { util } from '@aws-appsync/utils';

export function request(ctx) {
  const id = util.autoId();
  const now = util.time.nowISO8601();
  
  return {
    operation: 'PutItem',
    key: util.dynamodb.toMapValues({ id }),
    attributeValues: util.dynamodb.toMapValues({
      title: ctx.args.input.title,
      description: ctx.args.input.description || '',
      priority: ctx.args.input.priority,
      completed: false,
      owner: ctx.identity.username,
      createdAt: now,
      updatedAt: now,
      version: 1
    })
  };
}

export function response(ctx) {
  return ctx.result;
}
