// import AppError from '@shared/errors/AppError';

import FakeAppointmetsRepository from '@modules/appointments/repositories/fakes/FakeAppointmentsRepository';
// import FakeUsersRepository from '@modules/users/repositories/fakes/FakeUsersRepository';

import ListProviderMonthAvailabilityService from '@modules/appointments/services/ListProviderMonthAvailabilityService';

let fakeAppointmetsRepository: FakeAppointmetsRepository;
// let fakeUsersRepository: FakeUsersRepository;

let listProviderMonthAvailabilityService: ListProviderMonthAvailabilityService;

describe('ListProviderMonthAvailabilityService', () => {
  beforeEach(() => {
    // fakeUsersRepository = new FakeUsersRepository();
    fakeAppointmetsRepository = new FakeAppointmetsRepository();

    listProviderMonthAvailabilityService = new ListProviderMonthAvailabilityService(
      fakeAppointmetsRepository,
    );
  });

  it('should be able to list the month availability from provider', async () => {
    await fakeAppointmetsRepository.create({
      date: new Date(2021, 4, 20, 8, 0, 0),
      user_id: 'user_id',
      provider_id: 'user_id',
    });

    await fakeAppointmetsRepository.create({
      date: new Date(2021, 4, 20, 9, 0, 0),
      user_id: 'user_id',
      provider_id: 'user_id',
    });

    await fakeAppointmetsRepository.create({
      date: new Date(2021, 4, 20, 10, 0, 0),
      user_id: 'user_id',
      provider_id: 'user_id',
    });

    await fakeAppointmetsRepository.create({
      date: new Date(2021, 4, 20, 11, 0, 0),
      user_id: 'user_id',
      provider_id: 'user_id',
    });

    await fakeAppointmetsRepository.create({
      date: new Date(2021, 4, 20, 12, 0, 0),
      user_id: 'user_id',
      provider_id: 'user_id',
    });

    await fakeAppointmetsRepository.create({
      date: new Date(2021, 4, 20, 13, 0, 0),
      user_id: 'user_id',
      provider_id: 'user_id',
    });

    await fakeAppointmetsRepository.create({
      date: new Date(2021, 4, 20, 14, 0, 0),
      user_id: 'user_id',
      provider_id: 'user_id',
    });

    await fakeAppointmetsRepository.create({
      date: new Date(2021, 4, 20, 15, 0, 0),
      user_id: 'user_id',
      provider_id: 'user_id',
    });

    await fakeAppointmetsRepository.create({
      date: new Date(2021, 4, 20, 16, 0, 0),
      user_id: 'user_id',
      provider_id: 'user_id',
    });

    await fakeAppointmetsRepository.create({
      date: new Date(2021, 4, 20, 17, 0, 0),
      user_id: 'user_id',
      provider_id: 'user_id',
    });

    await fakeAppointmetsRepository.create({
      date: new Date(2021, 4, 21, 10, 0, 0),
      user_id: 'user_id',
      provider_id: 'user_id',
    });

    const availability = await listProviderMonthAvailabilityService.execute({
      provider_id: 'user_id',
      month: 5,
      year: 2021,
    });

    expect(availability).toEqual(
      expect.arrayContaining([
        {
          day: 19,
          available: true,
        },
        {
          day: 20,
          available: false,
        },
        {
          day: 21,
          available: true,
        },
        {
          day: 19,
          available: true,
        },
      ]),
    );
  });
});
