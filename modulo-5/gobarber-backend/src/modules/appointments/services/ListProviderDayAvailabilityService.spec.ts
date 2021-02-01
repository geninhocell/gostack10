// import AppError from '@shared/errors/AppError';

import FakeAppointmetsRepository from '@modules/appointments/repositories/fakes/FakeAppointmentsRepository';
// import FakeUsersRepository from '@modules/users/repositories/fakes/FakeUsersRepository';

import ListProviderDayAvailabilityService from '@modules/appointments/services/ListProviderDayAvailabilityService';

let fakeAppointmetsRepository: FakeAppointmetsRepository;
// let fakeUsersRepository: FakeUsersRepository;

let listProviderDayAvailabilityService: ListProviderDayAvailabilityService;

describe('ListProviderDayAvailabilityService', () => {
  beforeEach(() => {
    // fakeUsersRepository = new FakeUsersRepository();
    fakeAppointmetsRepository = new FakeAppointmetsRepository();

    listProviderDayAvailabilityService = new ListProviderDayAvailabilityService(
      fakeAppointmetsRepository,
    );
  });

  it('should be able to list the month availability from provider', async () => {
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

    /**
     * Avança a hora em 3.
     * getTime(): retorno igual do now, timestamp
     */
    jest.spyOn(Date, 'now').mockImplementationOnce(() => {
      return new Date(2021, 4, 20, 11).getTime();
    });

    const availability = await listProviderDayAvailabilityService.execute({
      provider_id: 'user_id',
      day: 20,
      month: 5,
      year: 2021,
    });

    expect(availability).toEqual(
      expect.arrayContaining([
        { hour: 8, available: false },
        { hour: 9, available: false },
        { hour: 10, available: false },
        { hour: 13, available: true },
        { hour: 14, available: false },
        { hour: 15, available: false },
        { hour: 16, available: true },
      ]),
    );
  });
});
