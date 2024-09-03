import mongoose from "mongoose";

const incidentSchema = new mongoose.Schema({
  title: {
    type: String, 
    required: true
  },
description: {
    type: String,
    required: true
  },
  lat: {
    type: Number,
    required: true
  },
  lng: {
    type: Number,
    required: true
  },
  isEmailSent : {
    type: Boolean,
    required: false, //este se puede poner o no
    default: false
  }
});

export const IncidentModel = mongoose.model('Incident',incidentSchema)