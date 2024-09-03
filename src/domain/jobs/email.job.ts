import cron from 'node-cron';
import { IncidentModel } from '../../data/models/incident.model';
import { EmailService } from '../services/email.service';
import { IncidentDataSource } from '../datasources/incident.datasource';
import { generateIncidentEmailTemplate } from '../templates/email.template';

export const emailJob = () => {
    const emailService= new EmailService();
    const incidentDataSource = new IncidentDataSource();
    cron.schedule('*/10 * * * * *',async()=>{
        console.log("cada 10 segundos")
        try{
            const incidents = await IncidentModel.find({isEmailSent : false});
            if(!incidents.length){
                console.log("No hay incidentes pendientes de enviar");
                return
            }

            console.log(`Procesando ${incidents.length} incidentes.`);
            await Promise.all(

                incidents.map(async (incident)=>{
                    const htmlBody = generateIncidentEmailTemplate(
                        incident.title,
                        incident.description,
                        incident.lat,
                        incident.lng
                    );
                    
                    await emailService.sendEmail({
                        to: "rubenramirez.arellano99@gmail.com",
                        subject: `Incidente: ${incident.title}`,
                        htmlBody:htmlBody
                    });
                    console.log(`Email enviado para el incidente con ID: ${incident._id}`);
                    await incidentDataSource.updateIncident(incident._id.toString(),{...incident, isEmailSent:true});
                    //await IncidentModel.findByIdAndUpdate(incident._id,{...incident, isEmailSent:true});
                    console.log(`Incidente actualizado para el ID: ${incident._id}`);
                })
            );

        }catch(error){
            console.log("Error durante el trabajo de envio de correos")
        }

    });
}