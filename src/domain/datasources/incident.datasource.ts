import { IncidentModel } from "../../data/models/incident.model";
import { IIncidentDocument } from "../entities/incident.entity";

export class IncidentDataSource{

    public updateIncident = async (id:string,incident: Partial<IIncidentDocument>) => {
        await IncidentModel.findByIdAndUpdate(id, {
            title: incident.title,
            description: incident.description,
            lng: incident.lng,
            lat: incident.lat,
            isEmailSent: true
        });
    }
}