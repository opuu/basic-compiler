MOV AX, 5
MOV x, AX
MOV AX, Hello
MOV y, AX
MOV AX, undefined
MOV bool, AX
MOV AX, 0
MOV count, AX
count:
MOV AX, undefined
MOV count, AX
MOV AX, 90
MOV score, AX
MOV AX, undefined
CMP AX, 1
JE grade
grade:
MOV AX, A
MOV grade, AX
grade:
MOV AX, B
MOV grade, AX
grade:
MOV AX, C
MOV grade, AX
grade:
MOV AX, D
MOV grade, AX
MOV AH, 09H
MOV DX, undefined
INT 21H
MOV AX, 10
MOV a, AX
MOV AX, 3
MOV b, AX
MOV AX, undefined
MOV result, AX
MOV AH, 09H
MOV DX, undefined
INT 21H
MOV AX, Hi
MOV greeting, AX
MOV AX, Opu
MOV name, AX
MOV AX, undefined
MOV message, AX
MOV AH, 09H
MOV DX, undefined
INT 21H
add:
MOV AX, undefined
RET
subtract:
MOV AX, undefined
RET
MOV AX, undefined
MOV c, AX
CALL add