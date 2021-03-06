/* eslint-disable no-underscore-dangle */
import httpMocks from 'node-mocks-http';
import ApiError from './ApiError';
import NotImplementedError from './NotImplementedError';
import NotFoundError from './NotFoundError';
import UnauthorizedError from './UnauthorizedError';
import BadRequestError from './BadRequestError';
import errorHandler from './handler';
import * as fixtures from './fixtures';

describe('API Error handling', () => {
  it('Should set the status to 500 and throw an internal server error.', () => {
    const error = new Error('Test error');
    const res = httpMocks.createResponse();

    errorHandler(error, null, res, () => {});

    const data = res._getData();
    expect(res.statusCode).to.be.equal(500);
    expect(data).to.be.deep.equal({
      code: 'ERR_INTERNAL',
      status: 500,
      message: 'Test error',
    });
  });

  it('Should send the error as an json object and set the proper status.', () => {
    const error = new ApiError('Test error', 404, 'ERR_NOT_FOUND');
    const res = httpMocks.createResponse();

    errorHandler(error, null, res, () => {});

    const data = res._getData();
    expect(res.statusCode).to.be.equal(404);
    expect(data).to.be.deep.equal({
      code: 'ERR_NOT_FOUND',
      status: 404,
      message: 'Test error',
    });
  });

  it('Should send the NotImplemented error as an json object and set the proper status.', () => {
    const res = httpMocks.createResponse();
    errorHandler(new NotImplementedError(), null, res, () => {});

    const data = res._getData();
    expect(res.statusCode).to.be.equal(501);
    expect(data).to.be.deep.equal(fixtures.NotImplemented);
  });

  it('Should send the NotFound error as an json object and set the proper status.', () => {
    const res = httpMocks.createResponse();
    errorHandler(new NotFoundError(), null, res, () => {});

    const data = res._getData();
    expect(res.statusCode).to.be.equal(404);
    expect(data).to.be.deep.equal(fixtures.NotFound);
  });

  it('Should send the Unauthorized error as an json object and set the proper status.', () => {
    const res = httpMocks.createResponse();
    errorHandler(new UnauthorizedError(), null, res, () => {});

    const data = res._getData();
    expect(res.statusCode).to.be.equal(401);
    expect(data).to.be.deep.equal(fixtures.Unauthorized);
  });

  it('Should send the BadRequest error as an json object and set the proper status.', () => {
    const res = httpMocks.createResponse();
    errorHandler(new BadRequestError(), null, res, () => {});

    const data = res._getData();
    expect(res.statusCode).to.be.equal(400);
    expect(data).to.be.deep.equal(fixtures.BadRequest);
  });
});
