/* 
dotnet add package xunit
dotnet add package Moq
dotnet add package FluentAssertions
*/

using System;
using System.Net;
using System.Net.Http;
using System.Threading;
using System.Threading.Tasks;
using FluentAssertions;
using Moq;
using Moq.Protected;
using Xunit;

public class ApiServiceTests
{
    private readonly Mock<HttpMessageHandler> _httpMessageHandlerMock;
    private readonly HttpClient _httpClient;
    private readonly ApiService _apiService;

    public ApiServiceTests()
    {
        _httpMessageHandlerMock = new Mock<HttpMessageHandler>();
        _httpClient = new HttpClient(_httpMessageHandlerMock.Object);
        _apiService = new ApiService(_httpClient);
    }

    [Fact]
    public async Task GetDataAsync_ShouldReturnData_WhenApiCallIsSuccessful()
    {
        // Arrange
        string apiUrl = "https://api1.example.com/data";
        string expectedData = "[{\"status\":\"Pending\",\"field1\":\"value1\",\"field2\":\"value2\"}]";
        var responseMessage = new HttpResponseMessage(HttpStatusCode.OK)
        {
            Content = new StringContent(expectedData)
        };

        _httpMessageHandlerMock
            .Protected()
            .Setup<Task<HttpResponseMessage>>(
                "SendAsync",
                ItExpr.IsAny<HttpRequestMessage>(),
                ItExpr.IsAny<CancellationToken>()
            )
            .ReturnsAsync(responseMessage);

        // Act
        string actualData = await _apiService.GetDataAsync(apiUrl);

        // Assert
        actualData.Should().Be(expectedData);
    }

    [Fact]
    public async Task UpdateDataAsync_ShouldReturnTrue_WhenApiCallIsSuccessful()
    {
        // Arrange
        string updateUrl = "https://api2.example.com/update";
        var responseMessage = new HttpResponseMessage(HttpStatusCode.OK);

        _httpMessageHandlerMock
            .Protected()
            .Setup<Task<HttpResponseMessage>>(
                "SendAsync",
                ItExpr.Is<HttpRequestMessage>(req =>
                    req.Method == HttpMethod.Put &&
                    req.RequestUri.ToString() == updateUrl &&
                    req.Content.Headers.ContentType.MediaType == "application/json"
                ),
                ItExpr.IsAny<CancellationToken>()
            )
            .ReturnsAsync(responseMessage);

        // Act
        bool result = await _apiService.UpdateDataAsync(updateUrl, "value1", "value2");

        // Assert
        result.Should().BeTrue();
    }
}
