Feature: Solicitud de recogida de productos
  Permite a los usuarios solicitar la recogida de productos para envío.


Scenario: Crear una nueva solicitud de recogida exitosa
    Given que un cliente desea solicitar la recogida de sus productos
    When completa todos los campos obligatorios correctamente
    Then se crea la solicitud de recogida con éxito