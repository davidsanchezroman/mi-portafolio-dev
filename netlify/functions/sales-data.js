// netlify/functions/sales-data.js
const { createClient } = require('@supabase/supabase-js');

// Inicializa el cliente de Supabase usando variables de entorno
// Netlify inyectará estas variables durante el despliegue
const supabaseUrl = process.env.SUPABASE_URL;
const supabaseAnonKey = process.env.SUPABASE_ANON_KEY;

// Verifica que las variables de entorno estén cargadas (útil para depuración)
if (!supabaseUrl || !supabaseAnonKey) {
    console.error('Error: Las variables de entorno SUPABASE_URL o SUPABASE_ANON_KEY no están configuradas.');
    // Podrías lanzar un error aquí o devolver una respuesta 500 inmediata si lo prefieres
    // throw new Error('Supabase environment variables are not set.');
}

const supabase = createClient(supabaseUrl, supabaseAnonKey);

exports.handler = async (event, context) => {
  try {
    // Realiza la consulta a tu tabla 'sales_data' en Supabase
    // Asegúrate de que 'sales_data' coincida con el nombre de tu tabla
    const { data, error } = await supabase
      .from('sales_data')
      .select('*');

    if (error) {
      console.error('Error al obtener datos de Supabase:', error);
      return {
        statusCode: 500,
        headers: {
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "*", // CORS para acceso desde tu frontend
          "Access-Control-Allow-Methods": "GET, OPTIONS",
          "Access-Control-Allow-Headers": "Content-Type",
        },
        body: JSON.stringify({ message: 'Error al cargar los datos de ventas desde la base de datos.', error: error.message }),
      };
    }

    return {
      statusCode: 200,
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*", // ¡Mantén esto para CORS!
        "Access-Control-Allow-Methods": "GET, OPTIONS",
        "Access-Control-Allow-Headers": "Content-Type",
      },
      body: JSON.stringify(data), // 'data' contendrá los registros de tu tabla
    };
  } catch (e) {
    console.error('Error general en la función:', e);
    return {
      statusCode: 500,
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
      },
      body: JSON.stringify({ message: 'Error interno del servidor.', error: e.message }),
    };
  }
};