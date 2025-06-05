using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace MyBackend.Migrations
{
    /// <inheritdoc />
    public partial class changeVagonFields : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "YearOfFabrication",
                table: "Vagons",
                newName: "Tip");

            migrationBuilder.RenameColumn(
                name: "Wheels",
                table: "Vagons",
                newName: "Stare");

            migrationBuilder.RenameColumn(
                name: "Weight",
                table: "Vagons",
                newName: "NumarAnexe");

            migrationBuilder.RenameColumn(
                name: "Type",
                table: "Vagons",
                newName: "SistemeElectrice");

            migrationBuilder.RenameColumn(
                name: "State",
                table: "Vagons",
                newName: "Roti");

            migrationBuilder.RenameColumn(
                name: "Obs",
                table: "Vagons",
                newName: "Observatii");

            migrationBuilder.RenameColumn(
                name: "NrOfAppendix",
                table: "Vagons",
                newName: "Greutate");

            migrationBuilder.RenameColumn(
                name: "NextRevision",
                table: "Vagons",
                newName: "UrmatoareaRevizie");

            migrationBuilder.RenameColumn(
                name: "LastRevision",
                table: "Vagons",
                newName: "UltimaRevizie");

            migrationBuilder.RenameColumn(
                name: "Image",
                table: "Vagons",
                newName: "Imagine");

            migrationBuilder.RenameColumn(
                name: "ElectricSystems",
                table: "Vagons",
                newName: "Frane");

            migrationBuilder.RenameColumn(
                name: "Capacity",
                table: "Vagons",
                newName: "Capacitate");

            migrationBuilder.RenameColumn(
                name: "Breaks",
                table: "Vagons",
                newName: "Caroserie");

            migrationBuilder.RenameColumn(
                name: "Body",
                table: "Vagons",
                newName: "AnFabricatie");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "UrmatoareaRevizie",
                table: "Vagons",
                newName: "NextRevision");

            migrationBuilder.RenameColumn(
                name: "UltimaRevizie",
                table: "Vagons",
                newName: "LastRevision");

            migrationBuilder.RenameColumn(
                name: "Tip",
                table: "Vagons",
                newName: "YearOfFabrication");

            migrationBuilder.RenameColumn(
                name: "Stare",
                table: "Vagons",
                newName: "Wheels");

            migrationBuilder.RenameColumn(
                name: "SistemeElectrice",
                table: "Vagons",
                newName: "Type");

            migrationBuilder.RenameColumn(
                name: "Roti",
                table: "Vagons",
                newName: "State");

            migrationBuilder.RenameColumn(
                name: "Observatii",
                table: "Vagons",
                newName: "Obs");

            migrationBuilder.RenameColumn(
                name: "NumarAnexe",
                table: "Vagons",
                newName: "Weight");

            migrationBuilder.RenameColumn(
                name: "Imagine",
                table: "Vagons",
                newName: "Image");

            migrationBuilder.RenameColumn(
                name: "Greutate",
                table: "Vagons",
                newName: "NrOfAppendix");

            migrationBuilder.RenameColumn(
                name: "Frane",
                table: "Vagons",
                newName: "ElectricSystems");

            migrationBuilder.RenameColumn(
                name: "Caroserie",
                table: "Vagons",
                newName: "Breaks");

            migrationBuilder.RenameColumn(
                name: "Capacitate",
                table: "Vagons",
                newName: "Capacity");

            migrationBuilder.RenameColumn(
                name: "AnFabricatie",
                table: "Vagons",
                newName: "Body");
        }
    }
}
