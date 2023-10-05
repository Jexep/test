import HttpError from '@wasp/core/HttpError.js';

export const getMoments = async (args, context) => {
  if (!context.user) {
    throw new HttpError(401);
  }

  return context.entities.Moment.findMany({
    where: {
      userId: context.user.id
    }
  });
};

export const getMoment = async (args, context) => {
  if (!context.user) {
    throw new HttpError(401);
  }

  const moment = await context.entities.Moment.findUnique({
    where: {
      id: args.momentId,
      userId: context.user.id
    }
  });

  if (!moment) {
    throw new HttpError(404, 'Moment not found');
  }

  return moment;
};