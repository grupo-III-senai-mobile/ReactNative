import React, { useEffect, useState } from 'react';
import { View, Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import BotaoCustomizado from '../../comum/componentes/BotaoCustomizado/BotaoCustomizado';
import CampoTextoCustomizado from '../../comum/componentes/CampoTextoCustomizado/CampoTextoCustomizado';
import CORES from '../../comum/constantes/cores';
import { estilos } from './TelaFormularioStyle';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import api from '../../comum/servicos/api';

const TelaFormulario = () => {
  const [usuario, setUsuario] = useState({
    id: '',
    nome: '',
    email: '',
    estado: '',
    cidade: '',
    bairro: '',
    rua: '',
    numero: ''
  });

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const usuarioLogado = await AsyncStorage.getItem('USUARIO_LOGADO');
        if (usuarioLogado) {
          const userData = JSON.parse(usuarioLogado);
          setUsuario(userData);
        }
      } catch (error) {
        console.error('Erro ao buscar os dados do usuário:', error);
        Alert.alert('Erro', 'Erro ao buscar os dados do usuário. Por favor, tente novamente.');
      }
    };

    fetchUserData();
  }, []);

  const handleSave = async () => {
    try {
      await api.put(`/usuario/${usuario.id}`, {
        nome: usuario.nome,
        email: usuario.email,
        senha: usuario.senha,
        estado: usuario.estado,
        cidade: usuario.cidade,
        bairro: usuario.bairro,
        rua: usuario.rua,
        numero: usuario.numero
      });
      Alert.alert('Sucesso', 'Perfil atualizado com sucesso!');
    } catch (error) {
      console.error('Erro ao atualizar o perfil:', error);
      Alert.alert('Erro', error.response?.data || 'Erro ao atualizar o perfil. Por favor, tente novamente.');
    }
  };

  const handleChange = (key, value) => {
    setUsuario(prevState => ({
      ...prevState,
      [key]: value
    }));
  };

  return (
    <View style={estilos.container}>
      <View style={{ alignSelf: 'center' }}>
        <MaterialIcons name='edit' size={64} color={CORES.PRIMARIA} />
      </View>

      <CampoTextoCustomizado placeholder='Nome' value={usuario.nome} onChangeText={value => handleChange('nome', value)} />
      <CampoTextoCustomizado placeholder='Email' value={usuario.email} onChangeText={value => handleChange('email', value)} />
      <CampoTextoCustomizado placeholder='Estado' value={usuario.estado} onChangeText={value => handleChange('estado', value)} />
      <CampoTextoCustomizado placeholder='Cidade' value={usuario.cidade} onChangeText={value => handleChange('cidade', value)} />
      <CampoTextoCustomizado placeholder='Bairro' value={usuario.bairro} onChangeText={value => handleChange('bairro', value)} />
      <CampoTextoCustomizado placeholder='Rua' value={usuario.rua} onChangeText={value => handleChange('rua', value)} />
      <CampoTextoCustomizado placeholder='Número' value={usuario.numero} onChangeText={value => handleChange('numero', value)} />

      <BotaoCustomizado onPress={handleSave}>Salvar Alterações</BotaoCustomizado>
    </View>
  );
};

export default TelaFormulario;
