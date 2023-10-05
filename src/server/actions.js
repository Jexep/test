import HttpError from '@wasp/core/HttpError.js'

export const createMoment = async (args, context) => {
  if (!context.user) { throw new HttpError(401) };

  const userId = context.user.id;

  return context.entities.Moment.create({
    data: {
      description: args.description,
      rating: args.rating,
      user: {
        connect: { id: userId }
      }
    }
  });
}

export const updateMoment = async (args, context) => {
  if (!context.user) { throw new HttpError(401) };

  const moment = await context.entities.Moment.findUnique({
    where: { id: args.id, userId: context.user.id }
  });
  if (!moment) { throw new HttpError(404) };

  return context.entities.Moment.update({
    where: { id: args.id },
    data: {
      description: args.description,
      rating: args.rating
    }
  });
}
