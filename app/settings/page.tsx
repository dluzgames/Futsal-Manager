export default function SettingsPage() {
  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold text-gray-900">Configurações</h1>
      <div className="bg-white shadow sm:rounded-lg">
        <div className="px-4 py-5 sm:p-6">
          <h3 className="text-base font-semibold leading-6 text-gray-900">Informações do Time</h3>
          <div className="mt-2 max-w-xl text-sm text-gray-500">
            <p>Gerencie as informações básicas do seu time de futsal.</p>
          </div>
          <form className="mt-5 space-y-4">
            <div>
              <label htmlFor="team-name" className="block text-sm font-medium leading-6 text-gray-900">
                Nome do Time
              </label>
              <div className="mt-2">
                <input
                  type="text"
                  name="team-name"
                  id="team-name"
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  placeholder="Ex: Falcões Futsal"
                />
              </div>
            </div>
            <button
              type="button"
              className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            >
              Salvar
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
