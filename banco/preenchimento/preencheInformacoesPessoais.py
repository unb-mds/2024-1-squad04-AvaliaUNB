
import pymysql.cursors
import json

# Carregar os dados do JSON
with open('../../data/info-pessoais-professores.json', 'r', encoding='utf-8') as file:
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
        # Atualizar a tabela de professores e inserir as graduações
        for professor in data['dados']:
            # Atualizar os dados do professor na tabela de professores
            sql_professor = """
                UPDATE professor
                SET email = %s, sala = %s
                WHERE cod_professor = %s
            """
            cursor.execute(sql_professor, (professor['email'], professor['sala'], professor['codigo']))

            # Inserir as graduações do professor na tabela professor_graduacoes
            for graduacao in professor['graduacoes']:
                sql_graduacao = """
                    INSERT INTO professor_graduacoes (cod_professor, graduacao)
                    VALUES (%s, %s)
                """
                cursor.execute(sql_graduacao, (professor['codigo'], graduacao))

    # Confirmar as alterações no banco de dados
    connection.commit()
    print("Dados atualizados com sucesso!")

except Exception as e:
    # Em caso de erro, imprimir o erro e fazer rollback das alterações
    print("Erro:", e)
    connection.rollback()

finally:
    # Fechar a conexão com o banco de dados
    connection.close()
