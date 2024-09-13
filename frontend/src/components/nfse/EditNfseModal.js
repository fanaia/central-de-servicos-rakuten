import React, { useState, useEffect } from "react";
import { IoClose } from "react-icons/io5";
import Acordeao from "../common/Acordeao";
import { useNFSe } from "../../contexts/NfseContext";
import PessoaForm from "../common/PessoaForm";
import { useEmpresa } from "../../contexts/EmpresaContext";

const EditNfseModal = ({ nfse, closeModal }) => {
  const { listaEmpresas, empresaSelecionada } = useEmpresa(); // Usando o contexto de empresas

  const { adicionarNfse, editarNfse } = useNFSe();

  // InfoNfse States
  const [numero, setNumero] = useState("");
  const [dataEmissao, setDataEmissao] = useState("");

  // Tomador States
  const [tipoTomador, setTipoTomador] = useState("pj");
  const [documentoTomador, setDocumentoTomador] = useState("");
  const [nomeTomador, setNomeTomador] = useState("");
  const [empresaSelecionadaLocal, setEmpresaSelecionadaLocal] = useState(""); // Estado local para o select

  // Prestador States
  const [tipoPrestador, setTipoPrestador] = useState("pj");
  const [documentoPrestador, setDocumentoPrestador] = useState("");
  const [nomePrestador, setNomePrestador] = useState("");

  // DeclaracaoPrestacaoServico States
  const [competencia, setCompetencia] = useState("");
  const [optanteSimplesNacional, setOptanteSimplesNacional] = useState(0);

  // Servico States
  const [aliquota, setAliquota] = useState(0);
  const [valorIss, setValorIss] = useState(0);
  const [valorServicos, setValorServicos] = useState(0);
  const [issRetido, setIssRetido] = useState(0);
  const [discriminacao, setDiscriminacao] = useState("");

  // Atualizar campos de Tomador ao selecionar empresa no dropdown
  useEffect(() => {
    if (empresaSelecionada) {
      // Se houver uma empresa selecionada, preencha os campos de Tomador
      setDocumentoTomador(empresaSelecionada.cnpj);
      setNomeTomador(empresaSelecionada.nome);
      setEmpresaSelecionadaLocal(empresaSelecionada.cnpj); // Atualiza o select localmente
    } else {
      // Limpa os campos de Tomador se não houver empresa selecionada
      setDocumentoTomador("");
      setNomeTomador("");
      setEmpresaSelecionadaLocal(""); // Limpa o select localmente
    }
  }, [empresaSelecionada]);

  // Atualizar o estado local quando o valor do select mudar
  const handleEmpresaChange = (e) => {
    const cnpjSelecionado = e.target.value;
    const empresa = listaEmpresas.find((emp) => emp.cnpj === cnpjSelecionado);
    if (empresa) {
      setDocumentoTomador(empresa.cnpj); // Atualiza o campo CNPJ de tomador
      setNomeTomador(empresa.nome); // Atualiza o nome de tomador
      setEmpresaSelecionadaLocal(cnpjSelecionado); // Atualiza o valor do select
    } else {
      setDocumentoTomador(""); // Limpa o CNPJ de tomador
      setNomeTomador(""); // Limpa o nome de tomador
      setEmpresaSelecionadaLocal(""); // Limpa o valor do
    }
  };

  // Preenche os campos caso uma NFSe seja passada para edição
  useEffect(() => {
    if (nfse) {
      setNumero(nfse.infoNfse.numero || "");

      setTipoTomador(nfse.infoNfse.tomador.tipo || "pf");
      setDocumentoTomador(nfse.infoNfse.tomador.documento);
      setNomeTomador(nfse.infoNfse.tomador.nome);

      setTipoPrestador(nfse.infoNfse.prestador.tipo || "pf");
      setDocumentoPrestador(nfse.infoNfse.prestador.documento);
      setNomePrestador(nfse.infoNfse.prestador.nome);

      setCompetencia(nfse.infoNfse.declaracaoPrestacaoServico.competencia);
      setOptanteSimplesNacional(
        nfse.infoNfse.declaracaoPrestacaoServico.optanteSimplesNacional || 0
      );

      setAliquota(nfse.infoNfse.declaracaoPrestacaoServico.servico.valores.aliquota || 0);
      setValorIss(nfse.infoNfse.declaracaoPrestacaoServico.servico.valores.valorIss || 0);
      setValorServicos(nfse.infoNfse.declaracaoPrestacaoServico.servico.valores.valorServicos);
      setIssRetido(nfse.infoNfse.declaracaoPrestacaoServico.servico.issRetido || 0);
      setDiscriminacao(nfse.infoNfse.declaracaoPrestacaoServico.servico.discriminacao);
    }
  }, [nfse]);

  // Envio do formulário
  const handleSubmit = async (e) => {
    e.preventDefault();

    const nfseData = {
      infoNfse: {
        numero,
        dataEmissao,
        prestador: {
          tipo: tipoPrestador,
          documento: documentoPrestador.replace(/[./-]/g, ""),
          nome: nomePrestador,
        },
        tomador: {
          tipo: tipoTomador,
          documento: documentoTomador.replace(/[./-]/g, ""),
          nome: nomeTomador,
        },
        declaracaoPrestacaoServico: {
          competencia,
          servico: {
            valores: {
              aliquota,
              valorIss,
              valorServicos,
            },
            issRetido,
            discriminacao,
          },
          optanteSimplesNacional,
        },
      },
    };

    let sucesso;
    if (nfse && nfse._id) {
      sucesso = await editarNfse(nfse._id, nfseData);
    } else {
      sucesso = await adicionarNfse(nfseData);
    }

    if (sucesso) {
      closeModal();
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-90 flex items-center justify-center z-10">
      <div
        className="bg-white dark:bg-gray-800 rounded-lg shadow-lg w-full max-w-4xl flex flex-col"
        style={{ height: "95%" }}
      >
        {/* Cabeçalho fixo */}
        <div className="flex justify-between items-center p-4 border-b border-gray-300 dark:border-gray-700">
          <h2 className="text-2xl text-gray-900 dark:text-gray-100 font-semibold">Editar NFSe</h2>
          <button className="text-gray-600 dark:text-gray-300" onClick={closeModal}>
            <IoClose size={24} />
          </button>
        </div>

        {/* Corpo com rolagem */}
        <div className="overflow-y-auto p-6 space-y-4 flex-1 form-container">
          <form onSubmit={handleSubmit}>
            <Acordeao titulo="Tomador" aberto={true}>
              <div className="flex space-x-4">
                <div className="flex-1">
                  <label>Selecione a Empresa</label>
                  <select
                    value={empresaSelecionadaLocal} // Estado local para não modificar o contexto
                    onChange={handleEmpresaChange}
                    className="mt-1 w-full"
                    disabled={!!empresaSelecionada} // Desabilita o select se empresaSelecionada existir
                  >
                    <option value="">Selecione uma empresa</option>
                    {listaEmpresas.map((empresa) => (
                      <option key={empresa.cnpj} value={empresa.cnpj}>
                        {empresa.nome}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="flex-1">
                  <label>CNPJ do Tomador</label>
                  <input
                    type="text"
                    value={documentoTomador}
                    onChange={(e) => setDocumentoTomador(e.target.value)}
                    readOnly={!!empresaSelecionada} // Torna somente leitura se houver uma empresa selecionada
                    className="mt-1 w-full"
                  />
                </div>
              </div>
            </Acordeao>

            <Acordeao titulo="Prestador" aberto={true}>
              <PessoaForm
                tipo={tipoPrestador}
                setTipo={setTipoPrestador}
                documento={documentoPrestador}
                setDocumento={setDocumentoPrestador}
                nome={nomePrestador}
                setNome={setNomePrestador}
              />
            </Acordeao>

            <Acordeao titulo="Informações da NFSe" aberto={true}>
              <div className="flex space-x-4">
                <div className="flex-1">
                  <label>Número</label>
                  <input type="number" value={numero} onChange={(e) => setNumero(e.target.value)} />
                </div>

                <div className="flex-1">
                  <label>Data de Emissão</label>
                  <input
                    type="date"
                    value={dataEmissao}
                    onChange={(e) => setDataEmissao(e.target.value)}
                  />
                </div>
              </div>

              <div className="flex space-x-4">
                <div className="flex-1">
                  <label>Competência</label>
                  <input
                    type="text"
                    value={competencia}
                    onChange={(e) => setCompetencia(e.target.value)}
                    placeholder="MM/YYYY"
                  />
                </div>

                <div className="flex-1">
                  <label>Optante pelo Simples Nacional</label>
                  <select
                    value={optanteSimplesNacional}
                    onChange={(e) => setOptanteSimplesNacional(e.target.value)}
                  >
                    <option value=""></option>
                    <option value="1">Sim</option>
                    <option value="0">Não</option>
                  </select>
                </div>
              </div>
            </Acordeao>

            <Acordeao titulo="Serviço" aberto={true}>
              <div className="grid grid-cols-3 gap-4">
                <div className="col-span-3">
                  <label>Discriminação</label>
                  <textarea
                    value={discriminacao}
                    onChange={(e) => setDiscriminacao(e.target.value)}
                    maxLength={500}
                    rows="3"
                  ></textarea>
                </div>
              </div>
            </Acordeao>

            <Acordeao titulo="Valores" aberto={true}>
              <div className="grid grid-cols-3 gap-4">
                <div>
                  <label>Valor dos Serviços</label>
                  <input
                    type="number"
                    value={valorServicos}
                    onChange={(e) => setValorServicos(e.target.value)}
                  />
                </div>

                <div>
                  <label>ISS Retido</label>
                  <select value={issRetido} onChange={(e) => setIssRetido(e.target.value)}>
                    <option value=""></option>
                    <option value="1">Sim</option>
                    <option value="0">Não</option>
                  </select>
                </div>

                <div>
                  <label>Alíquota</label>
                  <input
                    type="number"
                    value={aliquota}
                    onChange={(e) => setAliquota(e.target.value)}
                  />
                </div>

                <div>
                  <label>Valor ISS</label>
                  <input
                    type="number"
                    value={valorIss}
                    onChange={(e) => setValorIss(e.target.value)}
                  />
                </div>
              </div>
            </Acordeao>
          </form>
        </div>

        {/* Rodapé fixo */}
        <div className="p-4 border-t border-gray-700 bg-white dark:bg-gray-900 flex justify-end">
          <div className="flex space-x-4">
            <button
              type="button"
              onClick={closeModal}
              className="bg-gray-500 hover:bg-gray-600 text-white px-4 py-2 rounded-lg"
            >
              Cancelar
            </button>
            <button
              type="button"
              onClick={handleSubmit}
              className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg"
            >
              Salvar
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditNfseModal;
