#See https://aka.ms/containerfastmode to understand how Visual Studio uses this Dockerfile to build your images for faster debugging.

FROM mcr.microsoft.com/dotnet/aspnet:5.0 AS base
WORKDIR /app
EXPOSE 80
EXPOSE 443

FROM mcr.microsoft.com/dotnet/sdk:5.0 AS build
WORKDIR /src
COPY ["ATS.Api/ATS.Api.csproj", "ATS.Api/"]
RUN dotnet restore "ATS.Api/ATS.Api.csproj"
COPY . .
WORKDIR "/src/ATS.Api"
RUN dotnet build "ATS.Api.csproj" -c Release -o /app/build

FROM build AS publish
RUN dotnet publish "ATS.Api.csproj" -c Release -o /app/publish

FROM base AS final
WORKDIR /app
COPY --from=publish /app/publish .
ENTRYPOINT ["dotnet", "ATS.Api.dll"]