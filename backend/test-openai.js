// Simple test script to verify OpenAI integration
require('dotenv').config();

const { openaiService } = require('./dist/services/openai.service');

async function testOpenAI() {
  try {
    console.log('Testing OpenAI service integration...');
    
    // Test course content generation
    const courseContent = await openaiService.generateCourseContent({
      nivel: 'starter',
      ferramenta_foco: 'ChatGPT',
      tipo_conteudo: 'aula_interativa',
      objetivo: 'Introduzir conceitos básicos de IA para professores',
      duracao: 45,
      gamificacao: 'basico'
    });
    
    console.log('✅ Course content generation successful');
    console.log('Content preview:', courseContent.content.substring(0, 100) + '...');
    
    // Test BNCC lesson generation  
    const bnccLesson = await openaiService.generateBNCCLesson({
      disciplina: 'Matemática',
      ano_serie: '5º ano',
      topico: 'Frações',
      duracao: 50,
      objetivos: 'Entender conceitos básicos de frações'
    });
    
    console.log('✅ BNCC lesson generation successful');
    console.log('Lesson preview:', bnccLesson.content.substring(0, 100) + '...');
    
    console.log('🎉 All tests passed! OpenAI integration is working.');
    
  } catch (error) {
    console.error('❌ Test failed:', error.message);
    
    if (error.message.includes('OPENAI_API_KEY')) {
      console.log('💡 Make sure to set your OpenAI API key in the .env file');
    }
  }
}

// Only run if this file is executed directly
if (require.main === module) {
  testOpenAI();
}

module.exports = { testOpenAI };