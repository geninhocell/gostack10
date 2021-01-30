// import AppError from '@shared/errors/AppError';

import FakeAppointmetsRepository from '@modules/appointments/repositories/fakes/FakeAppointmentsRepository';
// import FakeUsersRepository from '@modules/users/repositories/fakes/FakeUsersRepository';

import ListProviderAppointmentsService from '@modules/appointments/services/ListProviderAppointmentsService';

let fakeAppointmetsRepository: FakeAppointmetsRepository;
// let fakeUsersRepository: FakeUsersRepository;

let listProviderAppointmentsService: ListProviderAppointmentsService;

describe('ListProviderAppointmentsService', () => {
  beforeEach(() => {
    // fakeUsersRepository = new FakeUsersRepository();
    fakeAppointmetsRepository = new FakeAppointmetsRepository();

    listProviderAppointmentsService = new ListProviderAppointmentsService(
      fakeAppointmetsRepository,
    );
  });

  it('should be able to list the appointments on a specific day', async () => {
    const appointment1 = await fakeAppointmetsRepository.create({
      date: new Date(2021, 4, 20, 8, 0, 0),
      user_id: 'user_id',
      provider_id: 'provider_id',
    });

    const appointment2 = await fakeAppointmetsRepository.create({
      date: new Date(2021, 4, 20, 9, 0, 0),
      user_id: 'user_id',
      provider_id: 'provider_id',
    });

    const appointments = await listProviderAppointmentsService.execute({
      provider_id: 'provider_id',
      day: 20,
      month: 5,
      year: 2021,
    });

    expect(appointments).toEqual([appointment1, appointment2]);
  });
});
