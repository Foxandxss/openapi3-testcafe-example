import * as superagent from 'superagent';
require('dotenv').config();

import { Place } from './models';

export const createPlace = async (place: Place) => {
  return superagent.post(`${process.env.SITE_URL}/api/places`)
    .auth(process.env.PLACESONLY_USERNAME, process.env.PLACESONLY_PASSWORD)
    .set('Content-Type', 'application/json')
    .send(JSON.stringify(place))
    .then(res => {
      return res.body as Place;
    })
    .catch(e => console.error(e));
    
}

export const deletePlace = async (id: string) => {
  return superagent.delete(`${process.env.SITE_URL}/api/places/${id}`)
    .auth(process.env.PLACESONLY_USERNAME, process.env.PLACESONLY_PASSWORD)
    .then(res => {
      console.log(`${id} deleted successfully`);
    })
    .catch(e => {
      if (e.status = 404) {
        console.log(`${id} already deleted`)
      } else {
        console.error(e);
      }
    });
    
};