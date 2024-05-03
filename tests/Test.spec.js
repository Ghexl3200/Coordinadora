import { test, expect } from '@playwright/test';
const fs = require('fs');
const moment = require('moment');
var  nombreEntrega = 'Camilo';
var  apellidosEntrega = 'Bernal';
var  celularEntrega = '3022936815';
var  emailUsuario = 'jorgeb@gmail.com';
var  descripcionTipoVia = 'Kilometro';
var  aplicativo = 'envios';
var  direccion = 'Cl 12 4 20 30';
var  fechaRecogida = '2024-05-03';

test.describe('Test Prueba Tecnica', () => {
  test('Nueva Solicitud', async ({//NOTA: En caso de que este test falle, puede ser debido a que ya se registro una solicitud con los mismos datos
    request
  }) => {
    const filePath = 'tests\\Body.json';
    const jsonData = JSON.parse(fs.readFileSync(filePath, 'utf-8'));

    // Actualiza los valores del JSON con las variables declaradas
    jsonData.nombreEntrega = nombreEntrega;
    jsonData.apellidosEntrega = apellidosEntrega;
    jsonData.celularEntrega = celularEntrega;
    jsonData.emailUsuario = emailUsuario;
    jsonData.descripcionTipoVia = descripcionTipoVia;
    jsonData.aplicativo = aplicativo;
    jsonData.direccion = direccion;
    jsonData.fechaRecogida = fechaRecogida;

    // Realiza la solicitud POST con el contenido del JSON
    const newTodoRes = await request.post('https://apiv2-test.coordinadora.com/recogidas/cm-solicitud-recogidas-ms/solicitud-recogida', {
      data: jsonData
    });

    // Verifica el estado de la respuesta
    const status = await newTodoRes.status();
    expect(status).toEqual(200);

    // Verificación del cuerpo de la respuesta
    const responseBody = await newTodoRes.json();
    expect(responseBody.data.id_recogida.message).toContain('Solicitud recogida programada exitosamente');

    // Verificación de campos obligatorios
    expect(jsonData.nombreEntrega).toBeTruthy();
    expect(jsonData.apellidosEntrega).toBeTruthy();
    expect(jsonData.celularEntrega).toBeTruthy();
    expect(jsonData.emailUsuario).toBeTruthy();
    expect(jsonData.descripcionTipoVia).toBeTruthy();
    expect(jsonData.aplicativo).toBeTruthy();
    expect(jsonData.direccion).toBeTruthy();
    expect(jsonData.fechaRecogida).toBeTruthy();

    // Validación de tipos de datos específicos
    expect(typeof jsonData.nombreEntrega).toBe('string');
    expect(typeof jsonData.apellidosEntrega).toBe('string');
    expect(typeof jsonData.celularEntrega).toBe('string');
    expect(typeof jsonData.emailUsuario).toBe('string');
    expect(typeof jsonData.descripcionTipoVia).toBe('string');
    expect(typeof jsonData.aplicativo).toBe('string');
    expect(typeof jsonData.direccion).toBe('string');
    expect(typeof jsonData.fechaRecogida).toBe('string');

    // Validación del formato de la fecha de recogida (yyyy-mm-dd)
    expect(moment(jsonData.fechaRecogida, 'YYYY-MM-DD', true).isValid()).toBe(true);
    const fechaRecogidaMoment = moment(jsonData.fechaRecogida, 'YYYY-MM-DD');
    const fechaHoy = moment();
    const fechaLimite = moment().add(5, 'businessDays');
    expect(fechaRecogidaMoment.isBetween(fechaHoy, fechaLimite, 'days', '[]')).toEqual(true);
  });


  // ------------------------------------------------------------------------------------------------------------------------------
  
  
  test('Solicitud Duplicada', async ({
    request
  }) => {
    const filePath = 'tests\\Body.json';
    const jsonData = JSON.parse(fs.readFileSync(filePath, 'utf-8'));

    // Actualiza los valores del JSON con las variables declaradas
    jsonData.nombreEntrega = nombreEntrega;
    jsonData.apellidosEntrega = apellidosEntrega;
    jsonData.celularEntrega = celularEntrega;
    jsonData.emailUsuario = emailUsuario;
    jsonData.descripcionTipoVia = descripcionTipoVia;
    jsonData.aplicativo = aplicativo;
    jsonData.direccion = direccion;
    jsonData.fechaRecogida = fechaRecogida;

    // Realiza la solicitud POST con el contenido del JSON
    const newTodoRes = await request.post('https://apiv2-test.coordinadora.com/recogidas/cm-solicitud-recogidas-ms/solicitud-recogida', {
      data: jsonData
    });

    // Verifica el estado de la respuesta
    const status = await newTodoRes.status();
    expect(status).toEqual(200);

    // Verificación del cuerpo de la respuesta
    const responseBody = await newTodoRes.json();
    expect(responseBody.data.message).toContain('Error, Ya existe una recogida programada para hoy');


    // Verificación de campos obligatorios
    expect(jsonData.nombreEntrega).toBeTruthy();
    expect(jsonData.apellidosEntrega).toBeTruthy();
    expect(jsonData.celularEntrega).toBeTruthy();
    expect(jsonData.emailUsuario).toBeTruthy();
    expect(jsonData.descripcionTipoVia).toBeTruthy();
    expect(jsonData.aplicativo).toBeTruthy();
    expect(jsonData.direccion).toBeTruthy();
    expect(jsonData.fechaRecogida).toBeTruthy();

    // Validación de tipos de datos específicos
    expect(typeof jsonData.nombreEntrega).toBe('string');
    expect(typeof jsonData.apellidosEntrega).toBe('string');
    expect(typeof jsonData.celularEntrega).toBe('string');
    expect(typeof jsonData.emailUsuario).toBe('string');
    expect(typeof jsonData.descripcionTipoVia).toBe('string');
    expect(typeof jsonData.aplicativo).toBe('string');
    expect(typeof jsonData.direccion).toBe('string');
    expect(typeof jsonData.fechaRecogida).toBe('string');
    expect(moment(jsonData.fechaRecogida, 'YYYY-MM-DD', true).isValid()).toBe(true);

    // Validación de que la fecha de recogida sea dentro de los próximos 5 días hábiles
    const fechaRecogidaMoment = moment(jsonData.fechaRecogida, 'YYYY-MM-DD');
    const fechaHoy = moment();
    const fechaLimite = moment().add(5, 'businessDays');
    expect(fechaRecogidaMoment.isBetween(fechaHoy, fechaLimite, 'days', '[]')).toBe(true);
  });

  // ------------------------------------------------------------------------------------------------------------------------------
  
  test('Solicitud Erronea', async ({
    request
  }) => {
    const filePath = 'tests\\Body2.json';
    const jsonData = JSON.parse(fs.readFileSync(filePath, 'utf-8'));

    // Realiza la solicitud POST
    const newTodoRes = await request.post('https://apiv2-test.coordinadora.com/recogidas/cm-solicitud-recogidas-ms/solicitud-recogida', {
      data: jsonData
    });

    // Verificación de campos obligatorios
    expect(jsonData.nombreEntrega).toBeTruthy();
    expect(jsonData.apellidosEntrega).toBeTruthy();
    expect(jsonData.celularEntrega).toBeTruthy();
    expect(jsonData.emailUsuario).toBeTruthy();
    expect(jsonData.descripcionTipoVia).toBeTruthy();
    expect(jsonData.aplicativo).toBeTruthy();
    expect(jsonData.direccion).toBeTruthy();
    expect(jsonData.fechaRecogida).toBeTruthy();

    // Validación de tipos de datos específicos
    expect(typeof jsonData.nombreEntrega).toBe('string');
    expect(typeof jsonData.apellidosEntrega).toBe('string');
    expect(typeof jsonData.celularEntrega).toBe('string');
    expect(typeof jsonData.emailUsuario).toBe('string');
    expect(typeof jsonData.descripcionTipoVia).toBe('string');
    expect(typeof jsonData.aplicativo).toBe('string');
    expect(typeof jsonData.direccion).toBe('string');
    expect(typeof jsonData.fechaRecogida).toBe('string');

    // Validación del formato de la fecha de recogida teniendo en cuenta los 5 dias
    expect(moment(jsonData.fechaRecogida, 'YYYY-MM-DD', true).isValid()).toBe(true);
    const fechaRecogidaMoment = moment(jsonData.fechaRecogida, 'YYYY-MM-DD');
    const fechaHoy = moment();
    const fechaLimite = moment().add(5, 'businessDays');
    expect(fechaRecogidaMoment.isBetween(fechaHoy, fechaLimite, 'days', '[]')).toBe(true);

    // Verifica el estado de la respuesta
    const status = await newTodoRes.status();
    expect(status).toEqual(200);
    // Verifica el mensaje de respuesta
    const responseBody = await newTodoRes.json();
    expect(responseBody.message).toContain('Los valores de entrada no son correctos.');

  });

});
