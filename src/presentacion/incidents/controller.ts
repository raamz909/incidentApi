import { Request, Response } from "express";
import { IncidentModel } from "../../data/models/incident.model";


export class IncidentController {

  public getIncidents = async (req: Request, res: Response) => {
    const incidents = await IncidentModel.find();
    res.send(incidents);
  }

  public getIncidentById = async (req: Request, res: Response) => {
    const id = req.params.id;
    const incident = await IncidentModel.findById(id);
    if (!incident) return res.status(404).send(`No incident found with the given id: ${id}`)
  
    res.send(incident);
  }

  public saveIncident = async (req: Request, res: Response) => {
    const { title, description, lat, lng } = req.body;
    const newIncident = await IncidentModel.create({
      title: title,
      description: description,
      lat: lat,
      lng: lng
    });
  
    return res.status(201).send(newIncident);
  }

  public deleteIncidentById = async (req: Request, res: Response) => {
    const id = req.params.id;
    const incident = await IncidentModel.findById(id);
    if (!incident) return res.status(404).send(`No incident found with the given id: ${id}`)
  
    await IncidentModel.findByIdAndDelete(id);
    res.send(incident);
  }

  public updateIncidentById = async (req: Request, res: Response) => {
    const id = req.params.id;
    const { title, description, lat, lng } = req.body;
    let incident = await IncidentModel.findById(id);
    if (!incident) return res.status(404).send(`No incident found with the given id: ${id}`)
  
    incident = await IncidentModel.findByIdAndUpdate(id, {
      title: title,
      description: description,
      lat: lat,
      lng: lng
    }, { new: true });
  
    res.send(incident);
  }
}