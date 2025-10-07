import { util } from '@aws-appsync/utils';

export function request(ctx) {
  const { id, version, ...updates } = ctx.args.input;
  
  return {
    operation: 'UpdateItem',
    key: util.dynamodb.toMapValues({ id }),
    update: {
      expression: 'SET #title = :title, #desc = :desc, #priority = :priority, #completed = :completed, #updatedAt = :updatedAt, #version = :newVersion',
      expressionNames: {
        '#title': 'title',
        '#desc': 'description',
        '#priority': 'priority',
        '#completed': 'completed',
        '#updatedAt': 'updatedAt',
        '#version': 'version'
      },
      expressionValues: util.dynamodb.toMapValues({
        ':title': updates.title,
        ':desc': updates.description,
        ':priority': updates.priority,
        ':completed': updates.completed,
        ':updatedAt': util.time.nowISO8601(),
        ':newVersion': version + 1,
        ':expectedVersion': version
      })
    },
    condition: {
      expression: '#version = :expectedVersion',
      expressionNames: { '#version': 'version' },
      expressionValues: { ':expectedVersion': { N: version } }
    }
  };
}

export function response(ctx) {
  if (ctx.error) {
    util.error('Conflict: Todo was modified by another user', 'ConflictException');
  }
  return ctx.result;
}
