import { injectable, inject } from 'tsyringe';
import { getHours, isAfter } from 'date-fns';

// import AppError from '@shared/errors/AppError';

import IAppointmentsRepository from '@modules/appointments/repositories/IAppointmentsRepository';

// import User from '@modules/users/infra/typeorm/entities/User';

interface IRequest {
  provider_id: string;
  month: number;
  year: number;
  day: number;
}

type IResponse = Array<{
  hour: number;
  available: boolean;
}>;

/**
 * Lista agendamentos de um provider em um dia colocando os horários disponiveis
 * e indisponibilizando os que já passaram.
 */
@injectable()
export default class ListProviderDayAvailabilityService {
  constructor(
    @inject('AppointmentsRepository')
    private appointmentsRepository: IAppointmentsRepository,
  ) {}

  public async execute({
    provider_id,
    day,
    month,
    year,
  }: IRequest): Promise<IResponse> {
    const appointments = await this.appointmentsRepository.findAllInDayFromProvider(
      {
        provider_id,
        day,
        month,
        year,
      },
    );

    /**
     * Monta o vetor com os horários de atendimento
     * Nesse caso especifico, das 08:00 às 17:00
     */
    const hourStart = 8;
    const eachHourArray = Array.from(
      { length: 10 },
      (value, index) => index + hourStart,
    );

    /**
     * Data atual, o uso do Date.now serve pra facilitar a função spyOn do jest.
     */
    const currentDate = new Date(Date.now());

    /**
     * Busca na lista de agendamentos os horários marcados e seta os disponiveis
     * e indisponiveis em (availability).
     */
    const availability = eachHourArray.map(hour => {
      const hasAppointmentInHour = appointments.find(
        appointment => getHours(appointment.date) === hour,
      );

      /**
       * Data do agendamento.
       */
      const appointmentDate = new Date(year, month - 1, day, hour);

      /**
       * hasAppointmentInHour: se há agendamento, horário não está disponivel.
       * isAfter(): data de agendamento deve ser depois da data corrente.
       */
      return {
        hour,
        available:
          !hasAppointmentInHour && isAfter(appointmentDate, currentDate),
      };
    });

    return availability;
  }
}
