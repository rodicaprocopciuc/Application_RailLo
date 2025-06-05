using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace MyBackend.Migrations
{
    /// <inheritdoc />
    public partial class newVagonFields : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "Body",
                table: "Vagons",
                type: "nvarchar(max)",
                nullable: false,
                defaultValue: "");

            migrationBuilder.AddColumn<string>(
                name: "Breaks",
                table: "Vagons",
                type: "nvarchar(max)",
                nullable: false,
                defaultValue: "");

            migrationBuilder.AddColumn<string>(
                name: "ElectricSystems",
                table: "Vagons",
                type: "nvarchar(max)",
                nullable: false,
                defaultValue: "");

            migrationBuilder.AddColumn<string>(
                name: "Image",
                table: "Vagons",
                type: "nvarchar(max)",
                nullable: false,
                defaultValue: "");

            migrationBuilder.AddColumn<DateOnly>(
                name: "LastRevision",
                table: "Vagons",
                type: "date",
                nullable: false,
                defaultValue: new DateOnly(1, 1, 1));

            migrationBuilder.AddColumn<DateOnly>(
                name: "NextRevision",
                table: "Vagons",
                type: "date",
                nullable: false,
                defaultValue: new DateOnly(1, 1, 1));

            migrationBuilder.AddColumn<int>(
                name: "NrOfAppendix",
                table: "Vagons",
                type: "int",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.AddColumn<string>(
                name: "Obs",
                table: "Vagons",
                type: "nvarchar(max)",
                nullable: false,
                defaultValue: "");

            migrationBuilder.AddColumn<int>(
                name: "Weight",
                table: "Vagons",
                type: "int",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.AddColumn<string>(
                name: "Wheels",
                table: "Vagons",
                type: "nvarchar(max)",
                nullable: false,
                defaultValue: "");

            migrationBuilder.AddColumn<string>(
                name: "YearOfFabrication",
                table: "Vagons",
                type: "nvarchar(max)",
                nullable: false,
                defaultValue: "");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Body",
                table: "Vagons");

            migrationBuilder.DropColumn(
                name: "Breaks",
                table: "Vagons");

            migrationBuilder.DropColumn(
                name: "ElectricSystems",
                table: "Vagons");

            migrationBuilder.DropColumn(
                name: "Image",
                table: "Vagons");

            migrationBuilder.DropColumn(
                name: "LastRevision",
                table: "Vagons");

            migrationBuilder.DropColumn(
                name: "NextRevision",
                table: "Vagons");

            migrationBuilder.DropColumn(
                name: "NrOfAppendix",
                table: "Vagons");

            migrationBuilder.DropColumn(
                name: "Obs",
                table: "Vagons");

            migrationBuilder.DropColumn(
                name: "Weight",
                table: "Vagons");

            migrationBuilder.DropColumn(
                name: "Wheels",
                table: "Vagons");

            migrationBuilder.DropColumn(
                name: "YearOfFabrication",
                table: "Vagons");
        }
    }
}
