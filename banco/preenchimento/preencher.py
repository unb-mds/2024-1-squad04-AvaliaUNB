
import pymysql.cursors
import json

with open('dados.json', 'r', encoding='utf-8') as file:
    data = json.load(file)
# Estabelecer a conexão com o banco de dados
connection = pymysql.connect(
    host='35.193.233.216',
    user='root',
    password='mdssquad4avaliaunbdb24',
    database='avalia_unb',
    charset='utf8mb3',
    cursorclass=pymysql.cursors.DictCursor
)

try:

    with connection.cursor() as cursor:
        # Preencher a tabela de professores
        for professor in data['professores']:
            # Inserir o professor na tabela de professores
            sql_professor = "INSERT INTO professor (cod_professor, nome) VALUES (%s, %s)"
            cursor.execute(sql_professor, (professor['codigo'], professor['nome']))

            # Preencher a tabela de matérias e a tabela de relacionamento professor_materia
            for periodo, disciplinas in professor['disciplinas'].items():
                for disciplina in disciplinas:
                    # Verificar se a matéria já existe na tabela de matérias
                    sql_select_materia = "SELECT * FROM materia WHERE cod_materia = %s"
                    cursor.execute(sql_select_materia, (disciplina['codigo'],))
                    materia = cursor.fetchone()

                    # Se a matéria não existir, insira na tabela de matérias
                    if not materia:
                        sql_insert_materia = "INSERT INTO materia (cod_materia, nome, qtd_hrs_materia) VALUES (%s, %s, %s)"
                        cursor.execute(sql_insert_materia, (disciplina['codigo'], disciplina['nome'], disciplina['carga_horaria']))

                    # Inserir a relação entre o professor e a matéria na tabela de relacionamento
                    sql_verificar = "SELECT * FROM professor_materia WHERE cod_professor = %s AND cod_materia = %s"
                    cursor.execute(sql_verificar, (professor['codigo'], disciplina['codigo']))
                    result_verificar = cursor.fetchone()

                    # Se não existir, inserir na tabela professor_materia
                    if not result_verificar:
                        sql_insert_relacionamento = "INSERT INTO professor_materia (cod_professor, cod_materia) VALUES (%s, %s)"
                        cursor.execute(sql_insert_relacionamento, (professor['codigo'], disciplina['codigo']))
                    else:
                        print("A combinação de códigos já existe na tabela professor_materia.")
    # Confirmar as alterações no banco de dados
    connection.commit()
    print("Dados inseridos com sucesso!")
except Exception as e:
    # Em caso de erro, imprimir o erro e fazer rollback das alterações
    print("Erro:", e)
    connection.rollback()
finally:
    # Fechar a conexão com o banco de dados
    connection.close()