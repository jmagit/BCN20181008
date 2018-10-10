Namespace Models
    Public Class Persona
        Private _id As Integer
        Private _nombre, _apellidos As String
        Private _edad As Byte

        Public Property id As Integer
            Get
                Return _id
            End Get
            Set(value As Integer)
                _id = value
            End Set
        End Property

        Public Property nombre As String
            Get
                Return _nombre
            End Get
            Set(value As String)
                _nombre = value
            End Set
        End Property

        Public Property apellidos As String
            Get
                Return _apellidos
            End Get
            Set(value As String)
                _apellidos = value
            End Set
        End Property

        Public Property edad As Byte
            Get
                Return _edad
            End Get
            Set(value As Byte)
                _edad = value
            End Set
        End Property

        Public Sub New()

        End Sub
        Public Sub New(id As Integer, nombre As String, apellidos As String, edad As Byte)
            Me.id = id
            Me.nombre = nombre
            Me.apellidos = apellidos
            Me.edad = edad
        End Sub



    End Class

End Namespace

