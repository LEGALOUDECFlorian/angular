public class ApiService
{
    private readonly HttpClient _client;

    public ApiService(HttpClient client)
    {
        _client = client;
    }

    public async Task<string> GetDataAsync(string apiUrl)
    {
        HttpResponseMessage response = await _client.GetAsync(apiUrl);
        response.EnsureSuccessStatusCode();
        return await response.Content.ReadAsStringAsync();
    }

    public async Task<bool> UpdateDataAsync(string updateUrl, string field1, string field2)
    {
        var updateData = new
        {
            fieldToUpdate1 = field1,
            fieldToUpdate2 = field2
        };

        string json = Newtonsoft.Json.JsonConvert.SerializeObject(updateData);
        HttpContent content = new StringContent(json, System.Text.Encoding.UTF8, "application/json");

        HttpResponseMessage response = await _client.PutAsync(updateUrl, content);
        return response.IsSuccessStatusCode;
    }
}
