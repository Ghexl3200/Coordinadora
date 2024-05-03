Feature: Solicitud de recogida de productos

  Scenario: Intentar crear una solicitud con fecha de recogida inválida
    Given que un cliente desea solicitar la recogida de sus productos
    When intenta ingresar una fecha de recogida fuera de los límites permitidos
    Then la solicitud de recogida no se crea y se muestra un mensaje de error
