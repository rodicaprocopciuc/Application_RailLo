using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace MyBackend.Migrations
{
    /// <inheritdoc />
    public partial class changeTrainFields : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "State",
                table: "Trains",
                newName: "Stare");

            migrationBuilder.RenameColumn(
                name: "Route",
                table: "Trains",
                newName: "Ruta");

            migrationBuilder.RenameColumn(
                name: "DepartureTime",
                table: "Trains",
                newName: "OraSosire");

            migrationBuilder.RenameColumn(
                name: "ArrivingTime",
                table: "Trains",
                newName: "OraPlecare");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "Stare",
                table: "Trains",
                newName: "State");

            migrationBuilder.RenameColumn(
                name: "Ruta",
                table: "Trains",
                newName: "Route");

            migrationBuilder.RenameColumn(
                name: "OraSosire",
                table: "Trains",
                newName: "DepartureTime");

            migrationBuilder.RenameColumn(
                name: "OraPlecare",
                table: "Trains",
                newName: "ArrivingTime");
        }
    }
}
