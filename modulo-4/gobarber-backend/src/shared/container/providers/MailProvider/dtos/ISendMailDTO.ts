import IParseMailTemplateDTO from '@shared/container/providers/MailTemplateProvider/dtos/IParseMailTemplateDTO';

interface IMailDTO {
  name: string;
  email: string;
}

export default interface ISendMailDTO {
  to: IMailDTO;
  from?: IMailDTO;
  subject: string;
  templateData: IParseMailTemplateDTO;
}
