from selenium import webdriver
from selenium.webdriver.common.keys import Keys
from selenium.webdriver.chrome.options import Options
from selenium.webdriver.support.ui import Select

from selenium.webdriver.common.by import By
from selenium.webdriver.support.ui import WebDriverWait
from selenium.common.exceptions import NoSuchElementException 
from selenium.webdriver.support import expected_conditions as EC
import json

options = Options()
options.add_experimental_option("detach", True)

""" 

    O trecho de código abaixo adiciona ao navegador de testes automatizados 
    argumentos já existentes do meu usuário do chrome, como cache e cookies já existentes.
    Desse modo é possível carregar o estado da página mais rapidamente.

    A cada execução do script, a página recarregava novamente todas as imagens, dados e cookies,
    tornando a execução muito lenta durante o carregamento das informações dos professores da fga.

    Para a correta execução do script em sua máquina, altere o endereço dos diretórios nos parâmetros
    de options.add_argument(). 

"""

options.add_argument("--headless=new")
options.add_argument("--user-data-dir=C:/Users/Admin/AppData/Local/Google/Chrome/User Data")
options.add_argument("--profile-directory=Profile 1")
options.add_argument("--disk-cache-dir=C:/Users/Admin/AppData/Local/Google/Chrome/User Data/Default/Cache")

###########################################################################################################

driver = webdriver.Chrome(options= options)

url='https://sigaa.unb.br/sigaa/public/docente/busca_docentes.jsf?aba=p-academico'
driver.get(url)
arquivo_json = 'url-fotos.json'

def adicionar_links(codigos, link_imagens, arquivo_json):

    # Carregar o conteúdo atual do arquivo JSON, se existir
    try:
        with open(arquivo_json, 'r', encoding="utf-8") as file:
            data = json.load(file)
    except FileNotFoundError:
        data = {"dados": []}

    # Adicionar os novos dados à lista existente
    for codigo, link in zip(codigos, link_imagens):
        codigo_existente = any(dado["codigo"] == codigo for dado in data["dados"])
        if not codigo_existente:
            data["dados"].append({"codigo": codigo, "link": link})

    # Escrever de volta no arquivo JSON
    with open(arquivo_json, 'w', encoding="utf-8") as file:
        json.dump(data, file, indent=2,  ensure_ascii=False)

try:
    # Espera o carregamento do menu suspenso do depertamento até estar clicável
    departamento_dropdown = WebDriverWait(driver, 10).until(
        EC.element_to_be_clickable((By.ID, "form:departamento"))
    )

    # Clica no menu do departamento
    departamento_dropdown.click()

    # Seleciona o departamento da Faculdade do Gama pelo value='673' no html
    select_departamento = Select(departamento_dropdown)
    select_departamento.select_by_value("673")

    # Clica no botão de busca
    buscar = driver.find_element("id", "form:buscar")
    buscar.click()

    listagem_professores = driver.find_elements(By.CLASS_NAME, 'listagem')[1].find_elements(By.TAG_NAME, 'tr')

    paginas_professores = driver.find_elements(By.TAG_NAME, 'a')[4:]

    links = []
    for link in paginas_professores:
        links.append(link.get_attribute('href'))
    links = links[:-1]

    codigos = []
    for codigo in links:
        codigos.append(codigo.split("=")[-1])

    links_imagens = []
    for professor in listagem_professores:
        try:
            links_imagens.append(professor.find_element(By.CLASS_NAME, 'foto').find_element(By.TAG_NAME, 'img').get_attribute('src'))
        except NoSuchElementException:
            pass

    adicionar_links(codigos, links_imagens, arquivo_json)

finally:
    driver.quit()