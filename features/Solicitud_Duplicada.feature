Feature: Solicitud de recogida de productos

  Scenario: Intentar crear una solicitud duplicada con misma dirección y fecha
    Given que existe una solicitud previa con la misma dirección y fecha de recogida
    When un cliente intenta crear una nueva solicitud con los mismos detalles
    Then la solicitud de recogida no se crea y se muestra un mensaje indicando duplicidad
