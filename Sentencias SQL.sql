Sentencias SQL

Punto A.
SELECT nomEmp AS Empleado,
       salEmp AS Salario,
       comis AS Comision,
       (salEmp + comis + 500000) AS Total_Pago
FROM Empleado
WHERE nroDepto = 3000
ORDER BY nomEmp;


Punto B.
SELECT codDepto AS Departamento,
       COUNT(*) AS Cantidad_Empleados
FROM Empleado
GROUP BY codDepto
HAVING COUNT(*) > 3
ORDER BY Cantidad_Empleados DESC;


Punto C.
SELECT *
FROM Empleado
WHERE codDepto NOT IN (SELECT codDepto FROM Departamento);



Punto D.
SELECT D.codDepto AS Departamento,
       SUM(E.salEmp + E.comisionE) AS Nomina_Total
FROM Empleado E
JOIN Departamento D ON E.codDepto = D.codDepto
GROUP BY D.codDepto
ORDER BY Nomina_Total DESC
LIMIT 1;



Punto E.
SELECT E.nomEmp AS Director,
       COUNT(*) AS Cantidad_Empleados_A_Cargo
FROM Empleado E
JOIN Departamento D ON E.nDIEmp = D.director
GROUP BY E.nomEmp
ORDER BY Cantidad_Empleados_A_Cargo DESC
LIMIT 3;



Punto F.
SELECT AVG(salEmp) AS Salario_Promedio_Empresa
FROM Empleado;

SELECT D.codDepto AS Departamento,
       AVG(E.salEmp) AS Salario_Promedio
FROM Empleado E
JOIN Departamento D ON E.codDepto = D.codDepto
GROUP BY D.codDepto
ORDER BY Salario_Promedio DESC
LIMIT 1;
