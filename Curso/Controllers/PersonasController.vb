Imports System.Net
Imports System.Web.Http
Imports System.Web.Http.Description
Imports Curso.Models

Namespace Controllers
    Public Class PersonasController
        Inherits System.Web.Http.ApiController

        Private Shared listado As List(Of Persona)

        ' GET: api/Personas
        Function GetPersonas() As IEnumerable(Of Persona)
            If listado Is Nothing Then
                listado = New List(Of Persona)
                listado.Add(New Persona(1, "Carmelo", "Coton", 33))
                listado.Add(New Persona(2, "Pepito", "Grillo", 155))
            End If
            Return listado
        End Function

        ' GET: api/Personas/5
        <ResponseType(GetType(Persona))>
        Function GetPersona(ByVal id As Integer) As IHttpActionResult
            Dim persona As Persona = listado.FirstOrDefault(Function(item) item.id = id)
            If IsNothing(persona) Then
                Return NotFound()
            End If

            Return Ok(persona)
        End Function

        ' PUT: api/Personas/5
        <ResponseType(GetType(Void))>
        Function PutPersona(ByVal id As Integer, ByVal persona As Persona) As IHttpActionResult
            If Not ModelState.IsValid Then
                Return BadRequest(ModelState)
            End If

            If Not id = persona.id Then
                Return BadRequest()
            End If
            If Not (PersonaExists(id)) Then
                Return NotFound()
            End If
            listado.Item(listado.FindIndex(Function(e) e.id = persona.id)) = persona
            Return StatusCode(HttpStatusCode.NoContent)
        End Function

        ' POST: api/Personas
        <ResponseType(GetType(Persona))>
        Function PostPersona(ByVal persona As Persona) As IHttpActionResult
            If Not ModelState.IsValid Or PersonaExists(persona.id) Then
                Return BadRequest(ModelState)
            End If

            listado.Add(persona)
            Return CreatedAtRoute("DefaultApi", New With {.id = persona.id}, persona)
        End Function

        ' DELETE: api/Personas/5
        <ResponseType(GetType(Persona))>
        Function DeletePersona(ByVal id As Integer) As IHttpActionResult
            If Not (PersonaExists(id)) Then
                Return NotFound()
            End If
            listado.Remove(listado.First(Function(e) e.id = id))
            Return StatusCode(HttpStatusCode.NoContent)
        End Function

        Private Function PersonaExists(ByVal id As Integer) As Boolean
            Return listado.Any(Function(e) e.id = id)
        End Function
    End Class
End Namespace